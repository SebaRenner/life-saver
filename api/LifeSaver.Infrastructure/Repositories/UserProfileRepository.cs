using LifeSaver.Domain.UserProfiles;

namespace LifeSaver.Infrastructure.Repositories;

public class UserProfileRepository : IUserProfileRepository
{
    private readonly AppDbContext _context;

    public UserProfileRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task SaveAsync(UserProfile profile, CancellationToken cancellationToken = default)
    {
        _context.UserProfiles.Add(profile);
        return _context.SaveChangesAsync(cancellationToken);
    }
}
