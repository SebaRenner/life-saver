using LifeSaver.Domain.UserProfiles;

namespace LifeSaver.Application.UserProfiles;

public interface IUserProfileService
{
    public Task<UserProfile?> GetUserProfileByIdAsync(string userId, CancellationToken cancellationToken = default);
}
