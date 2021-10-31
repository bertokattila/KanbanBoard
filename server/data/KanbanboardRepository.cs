using Microsoft.EntityFrameworkCore;

namespace kanbanboard
{
    public class KanbanboardRepository
    {
        private KanbanboardContext createDbContext()
        {
            //var contextOptionsBuilder = new DbContextOptionsBuilder<KanbanboardContext>();
            //contextOptionsBuilder.UseSqlServer(ConnectionString.connection);
            return new KanbanboardContext();
        }

        public void AddColumn(Column column)
        {
            using (var db = createDbContext())
            {
                db.Columns.Add(column);
                db.SaveChanges();
            }
        }
        public void AddCard(Card card)
        {
            using (var db = createDbContext())
            {
                db.Cards.Add(card);
                db.SaveChanges();
            }
        }

    }
}