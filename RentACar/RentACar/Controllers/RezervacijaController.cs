using Microsoft.AspNetCore.Mvc;
using RentACar.Models;
using RentACar.Services;
using MongoDB.Bson;
using MongoDB.Driver;
using ZstdSharp.Unsafe;

namespace RentACar.Controllers;

[ApiController]
[Route("api/[controller]")]

    public class RezervacijaController : Controller
    {
        private readonly AutoService _autoService;
        private readonly RezervacijaService _rezervacijaService;
    public RezervacijaController(AutoService autoService, RezervacijaService rezervacijaService) 
    {
        _autoService=autoService;
        _rezervacijaService=rezervacijaService;
    }


    [HttpGet]
    [Route("GetAllRezervacije/{idAuto}")]
    public async Task<IActionResult> GetAllRezervacije(string idAuto)
    {
        try
        {
            var auto = await _autoService.GetAsync(idAuto);
            if (auto == null)
            {
                return BadRequest("Auto sa datim ID-ijem nije pronađen.");
            }

            // Vrati listu rezervacija za odabrani auto
            return Ok(auto.ListaRezervacija ?? new List<Rezervacija>());
        }
        catch (Exception ex)
        {
            return BadRequest("Došlo je do greške prilikom preuzimanja rezervacija za auto: " + ex.Message);
        }
    }


    [HttpGet]
    [Route("GetRezervacija/{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            var rezervacija = await _rezervacijaService.GetAsync(id);

            if (rezervacija is null)
            {
                return NotFound();
            }

            return Ok(rezervacija);
        }
        catch (Exception ex)
        {
            return BadRequest("Greška prilikom preuzimanja rezervacije: " + ex.Message);
        }
    }


    [HttpPost]
    [Route("AddRezervacija/{id}")]
    public async Task<IActionResult> Post(string id, Rezervacija novaRezervacija)
    {
        try
        {
            if (novaRezervacija.DatumOd > novaRezervacija.DatumDo)
            {
                return BadRequest("Datum početka rezervacije mora biti pre datuma završetka.");
            }

            int brojDana = IzracunajBrojDana(novaRezervacija.DatumOd, novaRezervacija.DatumDo);
            novaRezervacija.BrojDana = brojDana;

            var auto = await _autoService.GetAsync(id);
            if (auto == null)
            {
                return BadRequest("Auto sa datim ID-ijem nije pronađen.");
            }
        
            foreach (var rezervacija in auto.ListaRezervacija ?? new List<Rezervacija>())
            {
                if (NovaRezervacijaPreklapaSaPostojecom(novaRezervacija, rezervacija))
                {
                    return BadRequest("Period rezervacije se preklapa sa postojećom rezervacijom za ovaj auto.");
                }
            }
            novaRezervacija.AutoID = id;
            novaRezervacija.UkupnaCena = auto.CenaPoDanu * brojDana;
          
            auto.ListaRezervacija ??= new List<Rezervacija>();        

            await _rezervacijaService.CreateAsync(novaRezervacija);
            auto.ListaRezervacija.Add(novaRezervacija);
            await _autoService.UpdateAsync(id, auto);

           
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest("Nastao problem prilkom dodavanja nove rezervacije: " + ex.Message);
        }
    }
    private int IzracunajBrojDana(DateTime datumOd, DateTime datumDo)
    {       
        TimeSpan razlika = datumDo.Date - datumOd.Date;
        return razlika.Days;
    }
    private bool NovaRezervacijaPreklapaSaPostojecom(Rezervacija novaRezervacija, Rezervacija postojecaRezervacija)
    {
        return novaRezervacija.DatumOd < postojecaRezervacija.DatumDo &&
               novaRezervacija.DatumDo > postojecaRezervacija.DatumOd;
    }


    [HttpPut]
    [Route("EditRezervacija/{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Rezervacija updatedRezervacija)
    {
        try
        {
            var rezervacija = await _rezervacijaService.GetAsync(id);
            if (rezervacija is null)
            {
                return NotFound();
            }
            updatedRezervacija.Id = rezervacija.Id;
            if (updatedRezervacija.AutoID==null)
                updatedRezervacija.AutoID=rezervacija.AutoID;
            if (updatedRezervacija.Ime == null)
                updatedRezervacija.Ime = rezervacija.Ime;
            if (updatedRezervacija.Email == null)
                updatedRezervacija.Email = rezervacija.Email;
            if(updatedRezervacija.DatumOd== DateTime.MinValue)
                updatedRezervacija.DatumOd = rezervacija.DatumOd;
            if (updatedRezervacija.DatumDo == DateTime.MinValue)
                updatedRezervacija.DatumDo = rezervacija.DatumDo;

            updatedRezervacija.BrojDana= IzracunajBrojDana(updatedRezervacija.DatumOd, updatedRezervacija.DatumDo);

            if (updatedRezervacija.DatumOd > updatedRezervacija.DatumDo)
            {
                return BadRequest("Datum početka rezervacije mora biti manji od datuma završetka.");
            }
            var auto = await _autoService.GetAsync(updatedRezervacija.AutoID);
            if (auto != null)
            {
                updatedRezervacija.UkupnaCena= auto.CenaPoDanu * updatedRezervacija.BrojDana;
            }

            foreach (var r in auto.ListaRezervacija ?? new List<Rezervacija>())
            {
                if(r.Id==id)
                { continue; }
                if (NovaRezervacijaPreklapaSaPostojecom(updatedRezervacija, r))
                {
                    return BadRequest("Period rezervacije se preklapa sa postojećom rezervacijom za ovaj auto.");
                }
            }


            await _rezervacijaService.UpdateAsync(id, updatedRezervacija);

            if (auto != null)
            {
                var index = auto.ListaRezervacija.FindIndex(r => r.Id == id);
                if (index != -1)
                {
                    auto.ListaRezervacija[index] = updatedRezervacija;
                    await _autoService.UpdateAsync(auto.Id, auto);
                }
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest("Nastao problem prilikom ažuriranja rezervacije: " + ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteRezervacija/{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var rezervacija = await _rezervacijaService.GetAsync(id);
            if (rezervacija is null)
            {
                return NotFound();
            }

            var auto = await _autoService.GetAsync(rezervacija.AutoID);
            if (auto != null)
            {
                auto.ListaRezervacija.RemoveAll(r => r.Id == id);
                // Ažuriraj auto u bazi podataka
                await _autoService.UpdateAsync(auto.Id, auto);

                // Ponovo dobavljamo auto iz baze podataka da bismo proverili da li je lista rezervacija zaista ažurirana
                auto = await _autoService.GetAsync(auto.Id);
                if (auto != null && auto.ListaRezervacija.Any(r => r.Id == id))
                {
                    return BadRequest("Nije uspelo ažuriranje liste rezervacija automobila.");
                }
            }

            await _rezervacijaService.RemoveAsync(id);

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest("Došlo je do greške prilikom brisanja rezervacije: " + ex.Message);
        }
    }




    //public IActionResult Index()
    //    {
    //        return View();
    //    }
}


