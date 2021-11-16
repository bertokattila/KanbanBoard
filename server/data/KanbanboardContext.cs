using System;
using Microsoft.EntityFrameworkCore;

namespace kanbanboard
{
    public class KanbanboardContext : DbContext
    {
        public KanbanboardContext(DbContextOptions<KanbanboardContext> options) : base(options)
        {

        }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Column> Columns { get; set; }
    }
}