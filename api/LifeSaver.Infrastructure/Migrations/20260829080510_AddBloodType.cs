using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LifeSaver.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBloodType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BloodType",
                table: "UserProfiles",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_UserProfile_BloodType",
                table: "UserProfiles",
                sql: "\"BloodType\" IN ('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_UserProfile_BloodType",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "BloodType",
                table: "UserProfiles");
        }
    }
}
