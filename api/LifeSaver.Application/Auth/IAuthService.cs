namespace LifeSaver.Application.Auth;

public interface IAuthService
{
    public Task<LoginResult> LoginAsync(string email, string password, CancellationToken cancellationToken = default);

    public Task<RegisterResult> RegisterAsync(string email, string password, CancellationToken cancellationToken = default);
}
