using LifeSaver.Domain.Prescriptions;
using LifeSaver.Domain.UserProfiles;

namespace LifeSaver.Application.UserProfiles;

public record UpdateUserProfileCommand(
    string UserId,
    string? FirstName,
    string? LastName,
    DateOnly? DateOfBirth,
    BloodType? BloodType,
    IEnumerable<Prescription> Prescriptions
);
