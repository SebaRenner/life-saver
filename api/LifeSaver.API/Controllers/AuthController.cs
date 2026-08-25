
using LifeSaver.API.Requests;
using LifeSaver.API.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LifeSaver.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserManager<IdentityUser> userManager) : ControllerBase
{
  [HttpPost("login")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
  {
    var user = await userManager.FindByEmailAsync(request.Email);
    if (user == null)
      return Unauthorized();

    var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);
    if (!passwordValid)
      return Unauthorized();

    return Ok(new AuthResponse(user.Id));
  }

  [HttpPost("register")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<AuthResponse>> Register([FromBody] RegistrationRequest request)
  {
    var user = new IdentityUser
    {
      UserName = request.Email,
      Email = request.Email
    };

    var result = await userManager.CreateAsync(user, request.Password);

    if (!result.Succeeded)
      return BadRequest(result.Errors);

    return Ok(new AuthResponse(user.Id));
  }
}
