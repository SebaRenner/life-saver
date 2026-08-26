using LifeSaver.API.Requests;
using LifeSaver.API.Responses;
using LifeSaver.Application.Auth;
using Microsoft.AspNetCore.Mvc;

namespace LifeSaver.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
  [HttpPost("login")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status401Unauthorized)]
  public async Task<ActionResult<AuthResponse>> Login(
      [FromBody] LoginRequest request,
      CancellationToken cancellationToken)
  {
    var result = await authService.LoginAsync(request.Email, request.Password, cancellationToken);

    if (!result.Succeeded)
        return Unauthorized();

    return Ok(new AuthResponse(result.UserId!));
  }

  [HttpPost("register")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<AuthResponse>> Register(
      [FromBody] RegistrationRequest request,
      CancellationToken cancellationToken)
  {
    var registerResult = await authService.RegisterAsync(request.Email, request.Password, cancellationToken);

    if (!registerResult.IdentityResult.Succeeded)
      return BadRequest(registerResult.IdentityResult.Errors);

    return Ok(new AuthResponse(registerResult.UserId!));
  }
}
