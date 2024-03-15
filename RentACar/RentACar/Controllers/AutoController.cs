using RentACar.Models;
using RentACar.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using ZstdSharp.Unsafe;

namespace RentACar.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AutoController : ControllerBase
{
    private readonly AutoService _autoService;
    private readonly VlasnikService _vlasnikService;

    public AutoController(AutoService autoService, VlasnikService vlasnikService)
    {
        _autoService = autoService;
        _vlasnikService = vlasnikService;
    }
  

    // Get:

    [HttpGet]
    [Route("GetAllAutomobili")] 
    public async Task<List<Auto>> Get() =>
        await _autoService.GetAsync();

    [HttpGet]    
    [Route("GetAuto/{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            var auto = await _autoService.GetAsync(id);

            if (auto is null)
            {
                return NotFound();
            }

            return Ok(auto);
        }
        catch (Exception ex)
        {
            return BadRequest("Greska prilikom preuzimanja vozila"+ex.Message);
        }
  
    }

    [HttpGet]
    [Route("FilterAutomobili")]
    public async Task<IActionResult> Filter([FromQuery] string grad, string? kompanija, decimal? maxCena, bool? invalidi, bool? automatic )
    {
        try
        {
            var builder = Builders<Auto>.Filter;
            FilterDefinition<Auto> filter = builder.Empty;
            if (!string.IsNullOrEmpty(grad))
                filter = filter & builder.Eq(p => p.Grad, grad);

            if (maxCena != null)
                filter = filter & builder.Lte(p => p.CenaPoDanu, maxCena);
            if (invalidi != null)
                filter = filter & builder.Eq(p => p.PogodanZaInvalide, invalidi);
            if (automatic != null)
                filter = filter & builder.Eq(p => p.Automatic, automatic);

            if (!string.IsNullOrEmpty(kompanija))
            {
                var vlasnik = await _vlasnikService.GetByCompanyAsync(kompanija);

                if (vlasnik != null)
                {
                    filter = filter & builder.In(p => p.Id, vlasnik.AutoIds);
                }
                else
                {
                    return BadRequest("Nije pronađen vlasnik sa datom kompanijom");
                }
            }
            var automobili = _autoService.Collection.Find(filter);
            return Ok(await automobili.ToListAsync());
        }
        catch(Exception e) { return BadRequest(e.Message); }
      
    }

    [HttpGet]
    [Route("Top")]
    public async Task<IActionResult> GetTopAutomobili()
    {
        try
        {
            var automobili = _autoService.Collection.Find(_ => true).Limit(6);
            return Ok(await automobili.ToListAsync());
        }
        catch (Exception ex)
        {
            return BadRequest("Greska prilkom preuzimanja prvih X"+ ex.Message);
        }
       
    }

    // Post:

    [HttpPost]
    [Route("AddAuto")]
    public async Task<IActionResult> Post(Auto noviAuto)
    {
        try
        {
            //noviAuto.Vlasnik = null;
            //noviAuto.QAs =new List<QA>();
            //noviAuto.ListaRezervacija=new List<Rezervacija>();
            await _autoService.CreateAsync(noviAuto);

            return CreatedAtAction(nameof(Get), new { id = noviAuto.Id }, noviAuto);
        }
        catch (Exception ex)
        {
            return BadRequest("Nastao problem prilkom dodavanja novog auta"+ex.Message);
        }
  

    }

    // Put:

    [HttpPut]
    [Route("EditAuto/{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Auto updatedAuto)
    {
        try
        {
            var auto = await _autoService.GetAsync(id);
            if (auto is null)
            {
                return NotFound();
            }

            updatedAuto.Id = auto.Id;

            await _autoService.UpdateAsync(id, updatedAuto);

            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest("Nastao problem prilkom azuriranja auta"+ex.Message);
        }

    }
    //[HttpPut]
    //[Route("EditAuto/{id:length(24)}")]
    //public async Task<IActionResult> Update(string id, Auto updatedAuto)
    //{
    //    try
    //    {
    //        var auto = await _autoService.GetAsync(id);
    //        if (auto is null)
    //        {
    //            return NotFound();
    //        }

    //        updatedAuto.Id = auto.Id;
    //        updatedAuto.PogodanZaInvalide = auto.PogodanZaInvalide;
    //        updatedAuto.Automatic = auto.Automatic;
    //        if (updatedAuto.Naziv == null)
    //            updatedAuto.Naziv = auto.Naziv;
    //        if (updatedAuto.Opis == null)
    //            updatedAuto.Opis = auto.Opis;
    //        if (updatedAuto.Boja == null)
    //            updatedAuto.Boja = auto.Boja;
    //        if (updatedAuto.Grad == null)
    //            updatedAuto.Grad = auto.Grad;
    //        if (updatedAuto.Adresa == null)
    //            updatedAuto.Adresa = auto.Adresa;
    //        if (updatedAuto.Slike == null)
    //            updatedAuto.Slike = auto.Slike;
    //        if (updatedAuto.BrojSedista == 0)
    //            updatedAuto.BrojSedista = auto.BrojSedista;
    //        if (updatedAuto.CenaPoDanu == 0)
    //            updatedAuto.CenaPoDanu = auto.CenaPoDanu;
    //        if (updatedAuto.QAs == null)
    //            updatedAuto.QAs = auto.QAs;
    //        if (updatedAuto.ListaRezervacija == null)
    //            updatedAuto.ListaRezervacija = auto.ListaRezervacija;
    //        if (updatedAuto.Vlasnik == null)
    //            updatedAuto.Vlasnik = auto.Vlasnik;


    //        await _autoService.UpdateAsync(id, updatedAuto);

    //        return NoContent();
    //    }
    //    catch (Exception ex)
    //    {
    //        return BadRequest("Nastao problem prilkom azuriranja auta" + ex.Message);
    //    }

    //}
    // Delete:

    [HttpDelete]
[Route("DeleteAuto/{id:length(24)}")]
public async Task<IActionResult> Delete(string id)
{
    try
    {
        var auto = await _autoService.GetAsync(id);
        if (auto is null)
        {
            return NotFound();
        }

        var vlasnikId = auto.Vlasnik?.Id;
        if (vlasnikId != null)
        {
            var vlasnik = await _vlasnikService.GetAsync(vlasnikId);
            if (vlasnik != null)
            {
                vlasnik.AutoIds?.Remove(id);
                await _vlasnikService.UpdateAsync(vlasnikId, vlasnik);

                foreach(var a in vlasnik.AutoIds)
                    {
                        var autic = await _autoService.GetAsync(a);
                        if(autic != null) { autic.Vlasnik = vlasnik; await _autoService.UpdateAsync(a, autic); }
                    }
            }
        }

        await _autoService.RemoveAsync(id);

        return NoContent();
    }
    catch (Exception ex)
    {
        return BadRequest("Nastao problem sa brisanjem" + ex.Message);
    }
}


}
