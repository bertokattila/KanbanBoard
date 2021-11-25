using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace kanbanboard.DTOs
{
    public class ColumnDto
    {
        public ColumnDto(Column column)
        {
            this.Id = column.Id;
            this.Title = column.Title;
            this.Cards = new List<CardDto>();
            if (column.Cards != null)
            {
                foreach (Card card in column.Cards)
                {
                    this.Cards.Add(new CardDto(card));
                }
            }
        }
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public System.Collections.Generic.List<CardDto> Cards { get; set; }

    }
}