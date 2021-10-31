using System;

namespace kanbanboard
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");


            KanbanboardRepository repo = new KanbanboardRepository();

            repo.AddColumn(new Column { Title = "Elso oszlop" });

            repo.AddCard(new Card { Title = "Fontos taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 6, Position = 0 });
        }
    }
}
