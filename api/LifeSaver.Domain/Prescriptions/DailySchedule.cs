namespace LifeSaver.Domain.Prescriptions;

public record DailySchedule
{
    public decimal Morning { get; init; }
    public decimal Afternoon { get; init; }
    public decimal Evening { get; init; }
    public decimal Night { get; init; }
}
