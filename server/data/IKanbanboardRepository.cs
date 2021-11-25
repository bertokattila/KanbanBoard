using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using kanbanboard.DTOs;

namespace kanbanboard
{
    public interface IKanbanboardRepositry
    {
        Task<Column> AddColumn(Column column);
        Task<Card> AddCard(Card card);
        Task<Card> GetCard(int id);
        Task<Column> GetColumn(int id);
        Task<Card> UpdateCard(Card card);
        Task DeleteCard(int cardId);
        Task DeleteColumn(int columnId);
        Task<Card> CardLocationChanged(CardMoveData moveData);
        Task<IEnumerable<Column>> GetBoard();
        Task<IEnumerable<Card>> GetCards();
    }
}