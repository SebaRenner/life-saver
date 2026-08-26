using LifeSaver.Domain.UserProfile;
using LifeSaver.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace LifeSaver.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserProfileRepository, UserProfileRepository>();
        return services;
    }
}
