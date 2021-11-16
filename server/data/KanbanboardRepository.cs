using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace kanbanboard
{
    public class KanbanboardRepository : IKanbanboardRepositry
    {
        private readonly KanbanboardContext db;
        public KanbanboardRepository(KanbanboardContext context)
        {
            db = context;
        }
        public async Task<Column> AddColumn(Column column)
        {

            var createdCol = await db.Columns.AddAsync(column);
            await db.SaveChangesAsync();
            return createdCol.Entity;

        }
        public void AddCard(Card card)
        {

            var position = db.Cards
                            .Where(c => c.ColumnId == card.ColumnId)
                            .Count();

            card.Position = position;

            db.Cards.Add(card);
            db.SaveChanges();

        }
        public void EditCard(Card card)
        {

            var cardToModify = db.Cards
                            .Where(c => c.Id == card.Id)
                            .FirstOrDefault();

            if (cardToModify != null)
            {
                cardToModify.Title = card.Title;
                cardToModify.Description = card.Description;
                cardToModify.Status = card.Status;
                cardToModify.Date = card.Date;

                db.SaveChanges();
            }

        }
        public void DeleteCard(int cardId)
        {

            var cardToDelete = db.Cards
                                .Where(c => c.Id == cardId)
                                .SingleOrDefault();

            if (cardToDelete != null)
            {
                var cardsToShift = db.Cards
                                    .Where(card => card.ColumnId == cardToDelete.ColumnId && card.Position > cardToDelete.Position);

                foreach (var card in cardsToShift)
                {
                    card.Position--;
                }
                db.Remove(cardToDelete);
                db.SaveChanges();
            }

        }

        public void DeleteColumn(int columnId)
        {

            var columnToDelete = db.Columns
                                .Where(c => c.Id == columnId)
                                .SingleOrDefault();

            if (columnToDelete != null)
            {
                var cardsToDelete = db.Cards
                                    .Where(card => card.ColumnId == columnToDelete.Id);

                foreach (var card in cardsToDelete)
                {
                    db.Remove(card);
                }
                db.Remove(columnToDelete);
                db.SaveChanges();
            }

        }

        public void CardLocationChanged(int cardId, int newColId, int newPos)
        {

            var card = db.Cards
                        .Where(card => card.Id == cardId)
                        .SingleOrDefault();
            if (card != null)
            {
                if (card.ColumnId == newColId)
                {
                    int oldPos = card.Position;
                    if (oldPos == newPos) return;
                    if (newPos > oldPos)
                    { // cards between shuld shift to lower positions
                        var cardsToShift = db.Cards
                                            .Where(c => c.ColumnId == card.ColumnId && c.Position >= oldPos && c.Position <= newPos);

                        foreach (var cardToShift in cardsToShift)
                        {
                            cardToShift.Position--;
                        }
                    }
                    else
                    { // cards between shuld shift to higher positions
                        var cardsToShift = db.Cards
                                            .Where(c => c.ColumnId == card.ColumnId && c.Position <= oldPos && c.Position >= newPos);

                        foreach (var cardToShift in cardsToShift)
                        {
                            cardToShift.Position++;
                        }
                    }
                }
                else // moves to new col
                {
                    /// old col adjust
                    var cardsToShiftOldCol = db.Cards
                                        .Where(c => c.ColumnId == card.ColumnId && c.Position >= card.Position);

                    foreach (var cardToShift in cardsToShiftOldCol)
                    {
                        cardToShift.Position--;
                    }

                    /// new col adjust
                    var cardsToShiftNewCol = db.Cards
                                        .Where(c => c.ColumnId == newColId && c.Position >= newPos);

                    foreach (var cardToShift in cardsToShiftNewCol)
                    {
                        cardToShift.Position++;
                    }

                    card.ColumnId = newColId;
                }

                card.Position = newPos;
                db.SaveChanges();
            }

        }
        public async Task<IEnumerable<Object>> GetBoard()
        {
            var columns = from c in db.Columns
                          select new
                          {
                              c.Id,
                              c.Title,
                              c.Cards
                          };

            return await columns.ToListAsync<Object>();
        }

        public async Task<IEnumerable<Card>> GetCards()
        {
            return await db.Cards.ToListAsync();
        }

    }
}