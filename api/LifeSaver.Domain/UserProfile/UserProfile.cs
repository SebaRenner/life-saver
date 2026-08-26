namespace LifeSaver.Domain.UserProfile;

public class UserProfile
{
    public required string UserId { get; set; }  // string because IdentityUser's Id is a string

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateOnly? DateOfBirth { get; set; }
}
