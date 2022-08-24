namespace DotnetReact.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        // user ID from AspNetUser table.
        public string? OwnerID { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}