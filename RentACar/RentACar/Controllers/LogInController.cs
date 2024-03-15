//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Threading.Tasks;

//using RentACar.Services;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using Microsoft.AspNetCore.Authentication;
//using System.Security.Claims;

//[ApiController]
//[Route("login")]
//public class LoginController : ControllerBase
//{
//    private readonly ILogger<LoginController> _logger;
//    private readonly VlasnikService _VlasnikService;
//    private readonly KlijentService _KlijentService;

//    public LoginController(ILogger<LoginController> logger, VlasnikService repo, KlijentService klijentService)
//    {
//        _logger = logger;
//        _VlasnikService = repo;
//        _KlijentService = klijentService;   
//    }

//    //[HttpPost]
//    //public async Task<IActionResult> Login([FromForm] string username, [FromForm] string password)
//    //{
//    //    _logger.LogInformation($"username: {username}, password: {password}");
//    //    try
//    //    {
//    //        if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
//    //        {
//    //            var user = await _repo.FindByUsername(username);
//    //            if (user != null && password.Equals(user.Password))
//    //            {
//    //                return Ok(user);
//    //            }
//    //        }
//    //        return BadRequest();
//    //    }
//    //    catch (Exception ex)
//    //    {
//    //        _logger.LogError(ex, "An error occurred during login");
//    //        return StatusCode(500);
//    //    }
//    //}
//    [HttpPost]
//    public async Task<IActionResult> Login([FromForm] string username, [FromForm] string password)
//    {
//        _logger.LogInformation($"username: {username}, password: {password}");
//        try
//        {
//            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
//            {
//                var user = await _KlijentService.FindByUsername(username);
//                if (user != null && password.Equals(user.Password))
//                {
//                    var role = user.IsOwner ? "owner" : "user";

//                    var claims = new List<Claim> {
//                    new Claim(ClaimTypes.Name, user.Username),
//                    new Claim(ClaimTypes.Role, role)
//                };

//                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
//                    var principal = new ClaimsPrincipal(identity);

//                    var properties = new AuthenticationProperties();

//                    await HttpContext.SignInAsync(
//                        CookieAuthenticationDefaults.AuthenticationScheme,
//                        principal,
//                        properties
//                    );

//                    return Ok(user);
//                }
//                else
//                {
//                   var userv = await _VlasnikService.FindByUsername(username);
//                    if (userv != null && password.Equals(userv.Password))
//                    {
//                        var role = userv.IsOwner ? "owner" : "user";

//                        var claims = new List<Claim> {
//                    new Claim(ClaimTypes.Name, userv.Username),
//                    new Claim(ClaimTypes.Role, role)
//                };

//                        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
//                        var principal = new ClaimsPrincipal(identity);

//                        var properties = new AuthenticationProperties();

//                        await HttpContext.SignInAsync(
//                            CookieAuthenticationDefaults.AuthenticationScheme,
//                            principal,
//                            properties
//                        );

//                        return Ok(userv);
//                    }
//                }
      
//            }
//            return BadRequest("Invalid username or password");
//        }
//        catch (Exception ex)
//        {
//            return BadRequest(ex.Message);
//        }
//    }

//}
