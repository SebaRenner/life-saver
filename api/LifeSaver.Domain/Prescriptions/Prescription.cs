namespace LifeSaver.Domain.Prescriptions;

public record Prescription
{
    public required string MedicationName { get; set; }

    public required decimal DosageAmount { get; set; }

    public required DosageUnit DosageUnit { get; set; }

    public required DailySchedule DailySchedule { get; set; }

    public required string? Indication { get; set; }
}
