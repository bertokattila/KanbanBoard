using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace kanbanboard
{
    public interface IKanbanboardRepositry
    {
        Task<Column> AddColumn(Column column);
        Task<Card> AddCard(Card card);
        Task<Card> GetCard(int id);
        Task<Card> UpdateCard(Card card);
        Task DeleteCard(int cardId);
        void DeleteColumn(int columnId);
        void CardLocationChanged(int cardId, int newColId, int newPos);
        Task<IEnumerable<Object>> GetBoard();

        Task<IEnumerable<Card>> GetCards();
    }
}