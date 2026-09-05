using LifeSaver.Domain.Prescriptions;

namespace LifeSaver.Domain.UserProfiles;

public class UserProfile
{
    private readonly List<Prescription> _prescriptions = new();

    public required string UserId { get; init; }  // string because IdentityUser's Id is a string

    public string? FirstName { get; private set; }

    public string? LastName { get; private set; }

    public DateOnly? DateOfBirth { get; private set; }

    public BloodType? BloodType { get; private set; }

    public IReadOnlyCollection<Prescription> Prescriptions => _prescriptions.AsReadOnly();

    public void UpdateProfile(string? firstName, string? lastName, DateOnly? dateOfBirth, BloodType? bloodType)
    {
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        BloodType = bloodType;
    }

    public void SetPrescriptions(IEnumerable<Prescription> prescriptions)
    {
        _prescriptions.Clear();
        _prescriptions.AddRange(prescriptions);
    }
}
