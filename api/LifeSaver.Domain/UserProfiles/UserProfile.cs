using LifeSaver.Domain.Prescriptions;

namespace LifeSaver.Domain.UserProfiles;

public class UserProfile
{
    private readonly List<Prescription> _prescriptions = new();

    public required string UserId { get; init; }  // string because IdentityUser's Id is a string

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public BloodType? BloodType { get; set; }

    public IReadOnlyCollection<Prescription> Prescriptions => _prescriptions.AsReadOnly();

    public void UpdateProfile(UserProfile newProfile)
    {
        FirstName = newProfile.FirstName;
        LastName = newProfile.LastName;
        DateOfBirth = newProfile.DateOfBirth;
        BloodType = newProfile.BloodType;
    }
}
