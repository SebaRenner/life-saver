namespace LifeSaver.API.Requests;

public record UpdateUserProfileRequest
{
    public string? FirstName { get; init; }

    public string? LastName { get; init; }

    public DateOnly? DateOfBirth { get; init; }
}
