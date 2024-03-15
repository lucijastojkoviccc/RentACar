using Microsoft.AspNetCore.Mvc;
using RentACar.Models;
using RentACar.Services;

namespace RentACar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlijentController : Controller
    {
        private readonly KlijentService _klijentService;

        public KlijentController(KlijentService klijentService)
        {
            _klijentService = klijentService;
        }

        //Get

        [HttpGet]       
        [Route("GetAllKlijenti")]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Klijent> klijenti = await _klijentService.GetAsync();
                return Ok(klijenti);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
            }
        }

  
        [HttpGet]       
        [Route("GetKlijent/{id:length(24)}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var klijent = await _klijentService.GetAsync(id);

                if (klijent is null)
                {
                    return NotFound();
                }

                return Ok(klijent);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
                //return RedirectToAction("Error", "Home"); // Redirect to an error page

            }
        }

        // Post:

        [HttpPost]       
        [Route("AddKlijent")]
        public async Task<IActionResult> Post(Klijent noviKlijent)
        {
            try
            {
                await _klijentService.CreateAsync(noviKlijent);
                //noviKlijent.IsOwner = false;

                return CreatedAtAction(nameof(Get), new { id = noviKlijent.Id }, noviKlijent);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
            }
        }

        // Put:

        [HttpPut]     
        [Route("EditKlijent/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Klijent updatedKlijent)
        {
            try
            {
                var client = await _klijentService.GetAsync(id);
                if (client is null)
                {
                    return NotFound();
                }

                updatedKlijent.Id = client.Id;

                await _klijentService.UpdateAsync(id, updatedKlijent);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while processing your request.");
            }
        }

        // Delete:

        [HttpDelete]     
        [Route("DeleteKlijent/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var klijent = await _klijentService.GetAsync(id);
                if (klijent is null)
                {
                    return NotFound();
                }

                await _klijentService.RemoveAsync(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Greska: " + ex);
            }
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
