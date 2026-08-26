namespace LifeSaver.Application.Auth;

public record LoginResult
{
    public bool Succeeded { get; init; }

    public string? UserId { get; init; }

    public static LoginResult Success(string userId) =>
        new() { Succeeded = true, UserId = userId };

    public static LoginResult Failure() =>
        new() { Succeeded = false };
}
