using System.ComponentModel.DataAnnotations;

namespace DotnetReact.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        // user ID from AspNetUser table.
        public string? OwnerID { get; set; }
        public string Name { get; set; }  = string.Empty;
        public bool IsComplete { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime createdAt {get;set;}

        [DataType(DataType.Date)]
        public DateTime dueDate {get;set;}
        public string priority {get; set;} = string.Empty;
        public string status {get; set;} = string.Empty;

        public string note {get; set;} = string.Empty;

    }
}