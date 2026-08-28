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
}
