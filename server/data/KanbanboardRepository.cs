using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

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
                var position = db.Cards
                                .Where(c => c.ColumnId == card.ColumnId)
                                .Count();

                card.Position = position;

                db.Cards.Add(card);
                db.SaveChanges();
            }
        }
        public void EditCard(Card card)
        {
            throw new NotImplementedException();
        }
        public void DeleteCard(int cardId)
        {
            throw new NotImplementedException();
        }

        public void DeleteColumn(int columnId)
        {
            throw new NotImplementedException();
        }

        public void CardLocationChanged(int cardid, int newColId, int newPos)
        {
            throw new NotImplementedException();
        }
        public List<Object> GetBoard()
        {
            using (var db = createDbContext())
            {
                var columns = from c in db.Columns
                              select new
                              {
                                  c.Id,
                                  c.Title,
                                  c.Cards
                              };

                return columns.ToList<Object>();
            }
        }

    }
}