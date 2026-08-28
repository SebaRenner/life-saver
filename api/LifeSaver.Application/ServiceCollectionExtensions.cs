using LifeSaver.Application.Auth;
using LifeSaver.Application.UserProfiles;
using Microsoft.Extensions.DependencyInjection;

namespace LifeSaver.Application;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserProfileService, UserProfileService>();
        return services;
    }
}