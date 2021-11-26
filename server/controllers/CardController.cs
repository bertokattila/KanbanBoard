using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using kanbanboard.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace kanbanboard.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly IKanbanboardRepositry _repo;

        public CardController(IKanbanboardRepositry kanbanboardRepositry)
        {
            _repo = kanbanboardRepositry;
        }

        [HttpPost]
        public async Task<ActionResult<CardDto>> AddCard(AddCardDto card)
        {
            try
            {
                if (card == null) return BadRequest();
                State state;
                Enum.TryParse(card.State, true, out state);

                var createdCard = await _repo.AddCard(new Card
                {
                    Title = card.Title,
                    Description = card.Description,
                    Status = state,
                    Date = DateTime.Parse(card.Deadline),
                    ColumnId = card.ColumnId

                });

                return new CardDto(createdCard);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CardDto>> UpdateCard(int id, EditCardDto card)
        {
            try
            {
                if (card == null || id != card.Id) return BadRequest();

                var cardToUpdate = await _repo.GetCard(id);
                if (cardToUpdate == null) return NotFound();

                State state;
                Enum.TryParse(card.State, true, out state);
                Card updatedCard = await _repo.UpdateCard(new Card
                {
                    Id = card.Id,
                    Title = card.Title,
                    Description = card.Description,
                    Status = state,
                    Date = DateTime.Parse(card.Deadline)

                });
                return CreatedAtAction(nameof(GetCard), new { id = updatedCard.Id }, new CardDto(updatedCard));

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CardDto>> GetCard(int id)
        {
            try
            {
                var card = await _repo.GetCard(id);
                if (card == null) return NotFound();
                return new CardDto(card);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteCard(int id)
        {
            try
            {
                var cardToDelete = await _repo.GetCard(id);

                if (cardToDelete == null)
                {
                    return NotFound("Card not found");
                }

                await _repo.DeleteCard(id);

                return Ok("Card deleted");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id:int}/location/")]
        public async Task<ActionResult<Card>> ChangeCardLocation(int id, CardMoveDto data)
        {
            try
            {
                if (id != data.cardId) return BadRequest();
                var card = await _repo.GetCard(id);
                if (card == null) return NotFound();

                return await _repo.CardLocationChanged(data);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult> GetCards()
        {
            try
            {
                return Ok(await _repo.GetCards());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
