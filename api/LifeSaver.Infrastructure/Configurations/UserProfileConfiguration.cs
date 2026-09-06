using LifeSaver.Domain.UserProfiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LifeSaver.Infrastructure.Configurations;

public class UserProfileConfiguration : IEntityTypeConfiguration<UserProfile>
{
    public void Configure(EntityTypeBuilder<UserProfile> builder)
    {
        builder.HasKey(x => x.UserId);

        builder.Property(x => x.UserId)
            .IsRequired();

        builder.Property(x => x.FirstName)
            .HasMaxLength(100);

        builder.Property(x => x.LastName)
            .HasMaxLength(100);

        builder.Property(x => x.DateOfBirth)
            .HasColumnType("date");

        builder.Property(x => x.BloodType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.ToTable(t => t.HasCheckConstraint(
            "CK_UserProfile_BloodType",
            "\"BloodType\" IN ('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative')"
        ));

        builder.OwnsMany(x => x.Prescriptions, prescription =>
        {
            prescription.ToTable("Prescriptions");

            // Shadow key — EF Core needs it, domain doesn't
            prescription.Property<int>("Id");
            prescription.HasKey("Id");

            prescription.Property(p => p.MedicationName)
                .IsRequired()
                .HasMaxLength(200);

            prescription.Property(p => p.DosageAmount)
                .IsRequired()
                .HasPrecision(6, 3);

            prescription.Property(p => p.DosageUnit)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(30);

            prescription.Property(p => p.Indication)
                .HasMaxLength(500);

            prescription.OwnsOne(p => p.DailySchedule, schedule =>
            {
                schedule.Property(s => s.Morning)
                    .IsRequired()
                    .HasColumnName("ScheduleMorning")
                    .HasPrecision(5, 2);

                schedule.Property(s => s.Afternoon)
                    .IsRequired()
                    .HasColumnName("ScheduleAfternoon")
                    .HasPrecision(5, 2);

                schedule.Property(s => s.Evening)
                    .IsRequired()       
                    .HasColumnName("ScheduleEvening")
                    .HasPrecision(5, 2);

                schedule.Property(s => s.Night)
                    .IsRequired()
                    .HasColumnName("ScheduleNight")
                    .HasPrecision(5, 2);
            });
        });
    }
}
