using LifeSaver.Domain.UserProfiles;

namespace LifeSaver.Application.UserProfiles;

public class UserProfileService : IUserProfileService
{
    private readonly IUserProfileRepository _repository;

    public UserProfileService(IUserProfileRepository repository)
    {
        _repository = repository;
    }

    public Task<UserProfile?> GetUserProfileByIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return _repository.GetByIdAsync(userId, cancellationToken);
    }

    public async Task<UserProfile?> UpdateUserProfileAsync(string userId, UserProfile userProfile, CancellationToken cancellationToken = default)
    {
        var existingProfile = await _repository.GetByIdAsync(userId, cancellationToken);

        if (existingProfile is null)
            return null;

        existingProfile.UpdateProfile(userProfile);

        await _repository.SaveAsync(existingProfile, cancellationToken);

        return existingProfile;
    }
}
