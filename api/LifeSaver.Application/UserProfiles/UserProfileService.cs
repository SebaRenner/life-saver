using LifeSaver.Domain.UserProfiles;
using LifeSaver.Infrastructure;
using Microsoft.AspNetCore.Identity;

namespace LifeSaver.Application.UserProfiles;

public class UserProfileService : IUserProfileService
{
    private readonly AppDbContext _context;
    private readonly IUserProfileRepository _userProfileRepository;
    private readonly UserManager<IdentityUser> _userManager;

    public UserProfileService(
        AppDbContext context,
        IUserProfileRepository userProfileRepository,
        UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userProfileRepository = userProfileRepository;
        _userManager = userManager;
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
