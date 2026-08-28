using LifeSaver.Domain.UserProfiles;
using Microsoft.EntityFrameworkCore;

namespace LifeSaver.Infrastructure.Repositories;

public class UserProfileRepository : IUserProfileRepository
{
    private readonly AppDbContext _context;

    public UserProfileRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<UserProfile?> GetByIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return _context.UserProfiles.FirstOrDefaultAsync(up => up.UserId == userId, cancellationToken);
    }

    public Task SaveAsync(UserProfile profile, CancellationToken cancellationToken = default)
    {
        _context.UserProfiles.Add(profile);
        return _context.SaveChangesAsync(cancellationToken);
    }
}
