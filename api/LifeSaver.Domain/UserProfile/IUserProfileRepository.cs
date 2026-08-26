namespace LifeSaver.Domain.UserProfile;

public interface IUserProfileRepository
{
    public Task SaveAsync(UserProfile profile, CancellationToken cancellationToken = default);
}
