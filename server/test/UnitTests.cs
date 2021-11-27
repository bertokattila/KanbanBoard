using Xunit;
using kanbanboard.data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System;
using kanbanboard.data.models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using kanbanboard.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace kanbanboard
{
    public class DbFixture /// segedosztaly az adateleresi reteggel valo kommunikaciohoz
    {
        public static IConfiguration InitConfiguration()
        {
            var config = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
               .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();
            return config;
        }
        public DbFixture() // sajat services, hogy di-vel lehesen elerni a 
        {
            var config = InitConfiguration();

            var serviceCollection = new ServiceCollection();
            serviceCollection
                .AddDbContext<KanbanboardContext>(options => options.UseSqlServer(config.GetConnectionString("DefaultConnection")),
                    ServiceLifetime.Scoped);
            serviceCollection.AddScoped<IKanbanboardRepositry, KanbanboardRepository>();
            ServiceProvider = serviceCollection.BuildServiceProvider();
        }

        public ServiceProvider ServiceProvider { get; private set; }
    }
    public class UnitTests : IClassFixture<DbFixture>
    {
        private ServiceProvider _serviceProvider;
        private readonly IKanbanboardRepositry _repo;

        public UnitTests(DbFixture fixture)
        {
            _serviceProvider = fixture.ServiceProvider;
            _repo = _serviceProvider.GetService<IKanbanboardRepositry>();
        }
        [Fact]
        public async void CreateColumn()
        {
            /// create new column
            string title = "Sajat oszlop";
            Column createdCol = await _repo.AddColumn(new Column { Title = title });
            Assert.Equal(title, createdCol.Title);
            await _repo.DeleteColumn(createdCol.Id);
        }

        [Fact]
        public async void CreateCard()
        {

            // creating column for the card
            string title = "Sajat oszlop";
            Column createdCol = await _repo.AddColumn(new Column { Title = title });



            var createdCard = await _repo.AddCard(new Card
            {
                Title = "Teszt kartya",
                Description = "Teszt leiras",
                Status = State.Done,
                Date = DateTime.Parse("2021-08-27"),
                ColumnId = createdCol.Id

            });
            Assert.Equal("Teszt kartya", createdCard.Title);
            Assert.Equal("Teszt leiras", createdCard.Description);
            Assert.Equal(State.Done, createdCard.Status);
            Assert.Equal(createdCol.Id, createdCard.ColumnId);

            await _repo.DeleteColumn(createdCol.Id);
        }

        [Fact]
        public async void EditCard()
        {

            // creating column for the card
            string title = "Sajat oszlop";
            Column createdCol = await _repo.AddColumn(new Column { Title = title });

            var createdCard = await _repo.AddCard(new Card
            {
                Title = "Teszt kartya",
                Description = "Teszt leiras",
                Status = State.Pending,
                Date = DateTime.Parse("2021-08-27"),
                ColumnId = createdCol.Id

            });
            Assert.Equal("Teszt kartya", createdCard.Title);
            Assert.Equal("Teszt leiras", createdCard.Description);
            Assert.Equal(State.Pending, createdCard.Status);
            Assert.Equal(createdCol.Id, createdCard.ColumnId);

            Card updatedCard = await _repo.UpdateCard(new Card
            {
                Id = createdCard.Id,
                Title = "Csere nev",
                Description = "Csere leiras",
                Status = State.Done,
                Date = DateTime.Parse("2021-08-27")
            });

            Assert.Equal(createdCard.Id, updatedCard.Id);
            Assert.Equal("Csere nev", updatedCard.Title);
            Assert.Equal("Csere leiras", updatedCard.Description);
            Assert.Equal(State.Done, updatedCard.Status);
            Assert.Equal(createdCol.Id, updatedCard.ColumnId);

            /// eleg ennyi cleanup, mert az oszlop torlese torli a benne levo kartyakat is
            await _repo.DeleteColumn(createdCol.Id);
        }


    }
}