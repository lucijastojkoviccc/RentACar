using Microsoft.AspNetCore.Mvc;
using RentACar.Models;
using RentACar.Services;
using System;

namespace RentACar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VlasnikController : Controller
    {
        private readonly VlasnikService _vlasnikService;
        private readonly AutoService _autoService;

        public VlasnikController(VlasnikService vlasnikService, AutoService autoService)
        {
            _vlasnikService = vlasnikService;
            _autoService = autoService;
        }

        // Get:

        [HttpGet]
        [Route("GetAllVlasnici")]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Vlasnik> vlasnici= await _vlasnikService.GetAsync();
                return Ok(vlasnici);
            }
            catch (Exception ex)
            {
                return BadRequest("Graska prilikom vracanja vlasnika" + ex);
            }
        }



        [HttpGet]
        [Route("GetVlasnik/{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var vlasnik = await _vlasnikService.GetAsync(id);

                if (vlasnik is null)
                {
                    return NotFound();
                }

                return Ok(vlasnik);
            }
            catch (Exception ex)
            {
                return BadRequest("Graska prilikom vracanja jednog vlasnika" + ex);
            }
        }


        [HttpGet]
        [Route("GetVlasnik/{kompanija}")]
        public async Task<IActionResult> GetSaKompanijom([FromRoute(Name = "kompanija")] string kompanija)
        {
            try
            {
                var vlasnik = await _vlasnikService.GetByCompanyAsync(kompanija);

                if (vlasnik is null)
                {
                    return BadRequest("Vlasnik sa datom kompanijom nije pronađen");
                    //return NotFound();
                }

                return Ok(vlasnik);
            }
            catch (Exception ex)
            {
                return BadRequest("Graska prilikom vracanja jednog vlasnika" + ex);
            }
        }

        // Post:

        [HttpPost]
        [Route("AddVlasnik")]
        public async Task<IActionResult> Post(Vlasnik noviVlasnik)
        {
            try
            {
                await _vlasnikService.CreateAsync(noviVlasnik);
                noviVlasnik.IsOwner = true;
                return CreatedAtAction(nameof(Get), new { id = noviVlasnik.Id }, noviVlasnik);
            }
            catch (Exception ex)
            {
                return BadRequest("Graska prilikom dodavanja vlasnika" + ex);
            }
        }

        // Put:

        [HttpPut]
        [Route("EditVlasnik/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Vlasnik azuriraniVlasnik)
        {
            try
            {
                var landlord = await _vlasnikService.GetAsync(id);
                if (landlord is null)
                {
                    return NotFound();
                }

                azuriraniVlasnik.Id = landlord.Id;
                azuriraniVlasnik.IsOwner = true;
                if (azuriraniVlasnik.Ime == null)
                    azuriraniVlasnik.Ime = landlord.Ime;
                if (azuriraniVlasnik.Kontakt == null)
                    azuriraniVlasnik.Kontakt = landlord.Kontakt;
                if (azuriraniVlasnik.Username == null)
                    azuriraniVlasnik.Username = landlord.Username;
                if (azuriraniVlasnik.Password == null)
                    azuriraniVlasnik.Password = landlord.Password;
                if (azuriraniVlasnik.AutoIds == null)
                    azuriraniVlasnik.AutoIds = landlord.AutoIds;
                if (azuriraniVlasnik.Kompanija == null)
                    azuriraniVlasnik.Kompanija = landlord.Kompanija;
                if (azuriraniVlasnik.Komentari == null)
                    azuriraniVlasnik.Komentari = landlord.Komentari;
                

                await _vlasnikService.UpdateAsync(id, azuriraniVlasnik);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Graska prilikom azuriranja vlasnika" + ex);
            }
        }

        [HttpPut]
        [Route("AddAutoToVlasnik/{idAuto:length(24)}/{idVlasnik:length(24)}")]
        public async Task<IActionResult> AddAutoToVlasnik(string idAuto, string idVlasnik)
        {
            try
            {
                var vlasnik = await _vlasnikService.GetAsync(idVlasnik);
                var auto = await _autoService.GetAsync(idAuto);
                if (vlasnik is null || auto is null)
                {
                    return NotFound();
                }

                if (vlasnik.AutoIds is null)
                {
                    vlasnik.AutoIds = new List<string>(); // Initialize AutoIds if it's null
                }

                vlasnik.AutoIds.Add(auto.Id);

                // Dodavanje informacija o vlasniku u automobil
                auto.Vlasnik = vlasnik;

                await _vlasnikService.UpdateAsync(idVlasnik, vlasnik);
                await _autoService.UpdateAsync(idAuto, auto);

                return Ok(vlasnik);
            }
            catch (Exception ex)
            {
                return BadRequest("Greška prilikom dodavanja auta vlasniku: " + ex.Message);
            }
        }


        [HttpDelete]
        [Route("DeleteVlasnik/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var vlasnik = await _vlasnikService.GetAsync(id);
                if (vlasnik == null)
                {
                    return NotFound();
                }

                if(vlasnik.AutoIds != null)
                {
                    foreach (var autoId in vlasnik.AutoIds)
                    {
                        await _autoService.RemoveAsync(autoId);
                    }
                }            

                // Nakon brisanja svih automobila, možemo ukloniti i vlasnika
                await _vlasnikService.RemoveAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Greška prilikom brisanja vlasnika i njegovih automobila: " + ex.Message);
            }
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
