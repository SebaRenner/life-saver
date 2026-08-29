namespace LifeSaver.Domain.UserProfiles;

public class UserProfile
{
    public required string UserId { get; init; }  // string because IdentityUser's Id is a string

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public BloodType? BloodType { get; set; }

    public void UpdateProfile(UserProfile newProfile)
    {
        FirstName = newProfile.FirstName;
        LastName = newProfile.LastName;
        DateOfBirth = newProfile.DateOfBirth;
        BloodType = newProfile.BloodType;
    }
}
