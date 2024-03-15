using RentACar.Models;
using RentACar.Services;
using global::RentACar.Models;
using global::RentACar.Services;
using Microsoft.AspNetCore.Mvc;

namespace RentACar.Controllers;


[ApiController]
[Route("api/[controller]")]
public class QAController : ControllerBase
{
    private readonly AutoService _autoService;

    public QAController(AutoService autoService)
    {
        _autoService = autoService;
    }

    // Post:

    [HttpPost]
    [Route("Ask/{idAuto:length(24)}/{pitanje}")]
    public async Task<IActionResult> Ask(string idAuto, string pitanje)
    {
        try
        {
            var auto = await _autoService.GetAsync(idAuto);
            if (auto is null)
            {
                return NotFound();
            }

            auto.QAs.Add(new QA { Pitanje = pitanje, Odgovor = null });

            await _autoService.UpdateAsync(idAuto, auto);

            return Ok(auto);
        }
        catch(Exception e) { return BadRequest(e.Message); }

    }

    // Put:

    [HttpPut]
    [Route("Answer/{idAuto:length(24)}/{answer}/{questionIndex}")]
    public async Task<IActionResult> Answer(string idAuto, string answer, int questionIndex)
    {
        try
        {
            var auto = await _autoService.GetAsync(idAuto);
            if (auto is null)
            {
                return NotFound();
            }

            auto.QAs[questionIndex].Odgovor = answer;
            await _autoService.UpdateAsync(idAuto, auto);

            return Ok(auto);
        }
        catch (Exception e) { return BadRequest(e.Message); }

    }


}
