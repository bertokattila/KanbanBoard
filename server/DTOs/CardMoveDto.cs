using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class CardMoveDto
    {
        [Required]
        public int? CardId { get; set; }

        [Required]
        public int? NewColId { get; set; }

        [Required]
        public int? NewPos { get; set; }

    }
}