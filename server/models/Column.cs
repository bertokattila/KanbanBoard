
namespace kanbanboard
{
    public class Column
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public System.Collections.Generic.List<Card> Cards { get; set; }

    }
}
