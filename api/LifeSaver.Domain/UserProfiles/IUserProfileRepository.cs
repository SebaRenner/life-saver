namespace LifeSaver.Domain.UserProfiles;

public interface IUserProfileRepository
{
    public Task SaveAsync(UserProfile profile, CancellationToken cancellationToken = default);

    public Task<UserProfile?> GetByIdAsync(string userId, CancellationToken cancellationToken = default);
}
