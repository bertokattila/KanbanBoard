using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class EditCardDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Deadline { get; set; }

    }
}