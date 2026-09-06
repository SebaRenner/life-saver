namespace LifeSaver.Domain.Prescriptions;

public record Prescription
{
    public required string MedicationName { get; init; }

    public required decimal DosageAmount { get; init; }

    public required DosageUnit DosageUnit { get; init; }

    public required DailySchedule DailySchedule { get; init; }

    public string? Indication { get; init; }
}
