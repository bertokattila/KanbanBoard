using System;
using kanbanboard.data.models;
using Microsoft.EntityFrameworkCore;

namespace kanbanboard.data
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