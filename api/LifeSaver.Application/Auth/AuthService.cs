using LifeSaver.Domain.UserProfiles;
using LifeSaver.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace LifeSaver.Application.Auth;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IUserProfileRepository _userProfileRepository;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthService(
        AppDbContext context,
        IUserProfileRepository userProfileRepository,
        UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userProfileRepository = userProfileRepository;
        _userManager = userManager;
    }

    public async Task<LoginResult> LoginAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return LoginResult.Failure();

        var passwordValid = await _userManager.CheckPasswordAsync(user, password);
        if (!passwordValid)
            return LoginResult.Failure();

        return LoginResult.Success(user.Id);
    }

    public async Task<RegisterResult> RegisterAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var user = new IdentityUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return RegisterResult.Failure(result);
            }

            var profile = new UserProfile { UserId = user.Id };
            await _userProfileRepository.SaveAsync(profile, cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            return RegisterResult.Success(result, user.Id);
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }
}
