using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class CardDto
    {
        public CardDto(Card card)
        {
            this.Id = card.Id;
            this.Title = card.Title;
            this.Description = card.Description;
            this.State = card.Status.ToString();
            this.Deadline = card.Date.ToString("yyyy-MM-dd");
            this.ColumnId = card.ColumnId;
            this.Position = card.Position;
        }
        [Required]
        public int? Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string Deadline { get; set; }

        [Required]
        public int? ColumnId { get; set; }

        [Required]
        public int? Position { get; set; }

    }
}