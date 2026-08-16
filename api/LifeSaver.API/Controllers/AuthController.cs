
using LifeSaver.API.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LifeSaver.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(UserManager<IdentityUser> userManager) : ControllerBase
{
  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request)
  {
    await Task.Yield();

    return Ok();
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
  {
    var user = new IdentityUser
    {
      UserName = request.Email,
      Email = request.Email
    };

    var result = await userManager.CreateAsync(user, request.Password);

    if (!result.Succeeded)
      return BadRequest(result.Errors);

    return Ok(new { userId = user.Id });
  }
}
