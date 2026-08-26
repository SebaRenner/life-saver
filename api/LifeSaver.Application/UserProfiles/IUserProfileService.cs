using Microsoft.AspNetCore.Identity;

namespace LifeSaver.Application.UserProfiles;

public interface IUserProfileService
{
    public Task<RegisterResult> RegisterAsync(string email, string password, CancellationToken cancellationToken = default);
}
