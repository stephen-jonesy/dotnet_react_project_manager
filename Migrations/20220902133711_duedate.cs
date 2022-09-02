using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotnetReact.Migrations
{
    public partial class duedate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "dueDate",
                table: "TodoItem",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dueDate",
                table: "TodoItem");
        }
    }
}
