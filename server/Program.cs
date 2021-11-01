using System;
using System.Text.Json;

namespace kanbanboard
{
    class Program
    {
        static void initData()
        {
            KanbanboardRepository repo = new KanbanboardRepository();

            repo.AddColumn(new Column { Title = "Elso oszlop" });
            repo.AddColumn(new Column { Title = "Masodik oszlop" });

            repo.AddCard(new Card { Title = "Elso taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 1 });
            repo.AddCard(new Card { Title = "Masodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "Harmadik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "Negyedik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 1 });
            repo.AddCard(new Card { Title = "Otodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "hatodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
        }
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            KanbanboardRepository repo = new KanbanboardRepository();
            //initData();

            System.Console.WriteLine("{0}", JsonSerializer.Serialize(repo.GetBoard()));

        }
    }
}
