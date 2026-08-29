using LifeSaver.API.Requests;
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
    public async Task<ActionResult<UserProfile>> GetUserProfile(
        string userId,
        CancellationToken cancellationToken)
    {
        var userProfile = await userProfileService.GetUserProfileByIdAsync(userId, cancellationToken);

        if (userProfile is null)
        {
            return NotFound();
        }

        return Ok(userProfile);
    }

    [HttpPut("{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserProfile>> UpdateUserProfile(
        string userId,
        [FromBody] UpdateUserProfileRequest userProfileRequestBody,
        CancellationToken cancellationToken)
    {
        var userProfile = new UserProfile
        {
            UserId = userId,
            FirstName = userProfileRequestBody.FirstName,
            LastName = userProfileRequestBody.LastName,
            DateOfBirth = userProfileRequestBody.DateOfBirth,
            BloodType = userProfileRequestBody.BloodType
        };

        var updatedUserProfile = await userProfileService.UpdateUserProfileAsync(userId, userProfile, cancellationToken);

        if (updatedUserProfile is null)
        {
            return NotFound();
        }

        return Ok(updatedUserProfile);
    }
}
