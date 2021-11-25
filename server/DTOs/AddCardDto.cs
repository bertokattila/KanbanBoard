using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class AddCardDto
    {

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Deadline { get; set; }

        [Required]
        public int ColumnId { get; set; }
    }
}