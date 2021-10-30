using System.ComponentModel.DataAnnotations;
using System;

namespace kanbanboard
{
    class Card
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Column Column { get; set; }

        [Required]
        public int Position { get; set; }


    }
}
