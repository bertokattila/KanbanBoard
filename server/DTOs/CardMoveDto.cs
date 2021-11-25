using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class CardMoveDto
    {
        [Required]
        public int? cardId { get; set; }

        [Required]
        public int? newColId { get; set; }

        [Required]
        public int? newPos { get; set; }

    }
}