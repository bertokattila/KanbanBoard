using System;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace kanbanboard
{
    class Program
    {
        static void initData()
        {
            /*KanbanboardRepository repo = new KanbanboardRepository();

            repo.AddColumn(new Column { Title = "Elso oszlop" });
            repo.AddColumn(new Column { Title = "Masodik oszlop" });

            repo.AddCard(new Card { Title = "Elso taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 1 });
            repo.AddCard(new Card { Title = "Masodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "Harmadik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "Negyedik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 1 });
            repo.AddCard(new Card { Title = "Otodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            repo.AddCard(new Card { Title = "hHtodik taszk", Status = State.Pending, Date = new DateTime(2021, 11, 11), ColumnId = 2 });
            */
        }
        static void Main(string[] args)
        {
            //Console.WriteLine("Hello World!");

            //KanbanboardRepository repo = new KanbanboardRepository();
            //initData();
            //repo.CardLocationChanged(4, 2, 0);
            //repo.EditCard(new Card { Id = 2, Title = "Masodikkkkkkkkk taszk", Status = State.Pending, Date = new DateTime(2025, 11, 11), ColumnId = 2 });
            //repo.DeleteCard(1);
            //repo.DeleteColumn(2);
            //System.Console.WriteLine("{0}", JsonSerializer.Serialize(repo.GetBoard()));
            CreateHostBuilder(args).Build().Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

