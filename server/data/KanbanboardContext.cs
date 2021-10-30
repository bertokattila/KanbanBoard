using Microsoft.EntityFrameworkCore;

namespace kanbanboard
{
    class KanbanboardContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<Column> Columns { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString.connection);
        }

    }
}