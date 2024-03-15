using RentACar.Models;
using RentACar.Services;
using Microsoft.AspNetCore.Mvc;


namespace RentACar.Controllers;


[ApiController]
[Route("api/[controller]")]
public class KomentarController : ControllerBase
{
    private readonly VlasnikService _vlasnikService;
    private readonly KlijentService _klijentService;

    public KomentarController(VlasnikService vlasnikService, KlijentService klijentService)
    {
        _vlasnikService = vlasnikService;
        _klijentService = klijentService;

    }

    // Put:

    [HttpPut]
    [Route("AddKomentarToVlasnik/{idVlasnik:length(24)}/{idKlijent:length(24)}/{text}/{ocena}")]
    public async Task<IActionResult> AddKomentarToVlasnik(string idVlasnik, string idKlijent, string text, int ocena)
    {
        try
        {
            var vlasnik = await _vlasnikService.GetAsync(idVlasnik);
            var klijent = await _klijentService.GetAsync(idKlijent);
            if (vlasnik is null || klijent is null)
            {
                return NotFound();
            }
            vlasnik.Komentari.Add(new Komentar { Text = text, Ocena = ocena, ImeOsobe = klijent.Ime });
            await _vlasnikService.UpdateAsync(idVlasnik, vlasnik);

            return Ok(vlasnik);
        }
        catch (Exception e) { return BadRequest(e.Message); }


    }

    [HttpPut]
    [Route("AddKomentarToKlijent/{idKlijent:length(24)}/{idVlasnik:length(24)}/{text}/{ocena}")]
    public async Task<IActionResult> AddKomentarToKlijent(string idKlijent, string idVlasnik, string text, int ocena)
    {
        try
        {
            var vlasnik = await _vlasnikService.GetAsync(idVlasnik);
            var klijent = await _klijentService.GetAsync(idKlijent);
            if (klijent is null || vlasnik is null)
            {
                return NotFound();
            }



            klijent.Komentari.Add(new Komentar { Text = text, Ocena = ocena, ImeOsobe = vlasnik.Ime });
            await _klijentService.UpdateAsync(idKlijent, klijent);

            return Ok(klijent);
        }
        catch(Exception e) { return BadRequest(e.Message); }


    }


}
