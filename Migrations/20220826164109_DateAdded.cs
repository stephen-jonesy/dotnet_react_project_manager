using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotnetReact.Migrations
{
    public partial class DateAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SomethingNew",
                table: "TodoItem");

            migrationBuilder.AddColumn<bool>(
                name: "IsComplete",
                table: "TodoItem",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                table: "TodoItem",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsComplete",
                table: "TodoItem");

            migrationBuilder.DropColumn(
                name: "createdAt",
                table: "TodoItem");

            migrationBuilder.AddColumn<string>(
                name: "SomethingNew",
                table: "TodoItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
