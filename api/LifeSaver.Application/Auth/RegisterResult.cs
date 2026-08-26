using Microsoft.AspNetCore.Identity;

namespace LifeSaver.Application.Auth;

public record RegisterResult
{
    public required IdentityResult IdentityResult { get; init; }

    public string? UserId { get; init; }

    public static RegisterResult Success(IdentityResult result, string userId) =>
        new() { IdentityResult = result, UserId = userId };

    public static RegisterResult Failure(IdentityResult result) =>
        new() { IdentityResult = result };
}
