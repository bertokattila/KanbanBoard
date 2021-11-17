using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
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


        [HttpPost("card")]
        public async Task<ActionResult<Column>> AddCard(Card card)
        {
            try
            {
                if (card == null) return BadRequest();

                var createdCard = await _repo.AddCard(card);

                return CreatedAtAction(nameof(GetBoard), createdCard);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("column")]
        public async Task<ActionResult<Column>> AddColumn(Column column)
        {
            try
            {
                if (column == null) return BadRequest();

                var createdCol = await _repo.AddColumn(column);

                return CreatedAtAction(nameof(GetBoard), createdCol);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("cards/{id:int}")]
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

        // GET: api/kanbanboard/board
        [HttpGet("board")]
        public async Task<ActionResult> GetBoard()
        {
            try
            {
                return Ok(await _repo.GetBoard());
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
