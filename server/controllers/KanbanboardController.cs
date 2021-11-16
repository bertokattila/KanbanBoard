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


        [HttpPost("column")]
        public async Task<ActionResult<Column>> Get(Column column)
        {
            try
            {
                if (column == null) return BadRequest();

                var createdCol = await _repo.AddColumn(column);

                return CreatedAtAction(nameof(Get), createdCol);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET: api/kanbanboard/board
        [HttpGet("board")]
        public async Task<ActionResult> Get()
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
