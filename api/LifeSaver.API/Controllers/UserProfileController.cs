using LifeSaver.Application.UserProfiles;
using LifeSaver.Domain.UserProfiles;
using Microsoft.AspNetCore.Mvc;

namespace LifeSaver.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController(IUserProfileService userProfileService) : ControllerBase
{
    [HttpGet("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserProfile>> GetUserProfile(string userId)
    {
        var userProfile = await userProfileService.GetUserProfileByIdAsync(userId);

        if (userProfile is null)
        {
            return NotFound();
        }

        return Ok(userProfile);
    }
}
