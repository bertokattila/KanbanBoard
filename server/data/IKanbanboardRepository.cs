using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace kanbanboard
{
    public interface IKanbanboardRepositry
    {
        public void AddColumn(Column column);
        public void AddCard(Card card);
        public void EditCard(Card card);

        public void DeleteCard(int cardId);
        public void DeleteColumn(int columnId);
        public void CardLocationChanged(int cardId, int newColId, int newPos);
        public List<Object> GetBoard();

        Task<IEnumerable<Card>> GetCards();
    }
}