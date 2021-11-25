using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class AddColumnDto
    {
        [Required]
        public string Title { get; set; }
    }
}