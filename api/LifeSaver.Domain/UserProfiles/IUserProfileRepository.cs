namespace LifeSaver.Domain.UserProfiles;

public interface IUserProfileRepository
{
    public Task SaveAsync(UserProfile profile, CancellationToken cancellationToken = default);
}
