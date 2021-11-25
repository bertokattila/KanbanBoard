using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using kanbanboard.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace kanbanboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class KanbanboardController : ControllerBase
    {
        private readonly IKanbanboardRepositry _repo;

        public KanbanboardController(IKanbanboardRepositry kanbanboardRepositry)
        {
            _repo = kanbanboardRepositry;
        }

        [HttpPost("column")]
        public async Task<ActionResult<ColumnDto>> AddColumn(AddColumnDto addColumnDto)
        {
            try
            {
                if (addColumnDto == null) return BadRequest();

                Column createdCol = await _repo.AddColumn(new Column { Title = addColumnDto.Title });

                return CreatedAtAction(nameof(GetBoard), new ColumnDto(createdCol));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("column/{id:int}")]
        public async Task<ActionResult> DeleteColumn(int id)
        {
            try
            {
                var colToDelete = await _repo.GetColumn(id);

                if (colToDelete == null)
                {
                    return NotFound("Column not found");
                }

                await _repo.DeleteColumn(id);

                return Ok("Column (and cards in the column if any) deleted");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("card")]
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

                return CreatedAtAction(nameof(GetBoard), new CardDto(createdCard));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("card/{id:int}")]
        public async Task<ActionResult<Card>> UpdateCard(int id, Card card)
        {
            try
            {
                if (card == null || id != card.Id) return BadRequest();

                var cardToUpdate = await _repo.GetCard(id);
                if (cardToUpdate == null) return NotFound();

                return await _repo.UpdateCard(card);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("card/{id:int}")]
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

        [HttpPut("card/{id:int}/location/")]
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


        // GET: api/kanbanboard/board
        [HttpGet("board")]
        public async Task<ActionResult<IEnumerable<ColumnDto>>> GetBoard()
        {
            try
            {
                IEnumerable<Column> columns = await _repo.GetBoard();
                List<ColumnDto> columnDtos = new List<ColumnDto>();
                foreach (Column column in columns)
                {
                    columnDtos.Add(new ColumnDto(column));
                }
                return Ok(columnDtos);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("cards")]
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
