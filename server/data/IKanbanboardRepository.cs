using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace kanbanboard
{
    public interface IKanbanboardRepositry
    {
        Task<Column> AddColumn(Column column);
        void AddCard(Card card);
        void EditCard(Card card);
        void DeleteCard(int cardId);
        void DeleteColumn(int columnId);
        void CardLocationChanged(int cardId, int newColId, int newPos);
        Task<IEnumerable<Object>> GetBoard();

        Task<IEnumerable<Card>> GetCards();
    }
}