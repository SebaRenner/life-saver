
using LifeSaver.API.Requests;
using LifeSaver.API.Responses;
using LifeSaver.Application.UserProfiles;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LifeSaver.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(
    UserManager<IdentityUser> userManager,
    IUserProfileService userProfileService) : ControllerBase
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
  public async Task<ActionResult<AuthResponse>> Register(
      [FromBody] RegistrationRequest request,
      CancellationToken cancellationToken)
  {
    var registerResult = await userProfileService.RegisterAsync(request.Email, request.Password, cancellationToken);

    if (!registerResult.IdentityResult.Succeeded)
      return BadRequest(registerResult.IdentityResult.Errors);

    return Ok(new AuthResponse(registerResult.UserId!));
  }
}
