using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using kanbanboard.data.models;
using kanbanboard.DTOs;

namespace kanbanboard.data
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
        Task<Card> CardLocationChanged(CardMoveDto moveData);
        Task<IEnumerable<Column>> GetBoard();
        Task<IEnumerable<Card>> GetCards();
    }
}