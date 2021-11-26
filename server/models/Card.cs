using System;
using System.ComponentModel.DataAnnotations;

namespace kanbanboard
{
    public enum State
    {
        Pending,
        Progress,
        Done,
        Postponed
    }
    public class Card
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public State Status { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int? ColumnId { get; set; }

        public Column Column { get; set; }

        [Required]
        public int Position { get; set; }
    }
}
