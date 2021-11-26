using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using kanbanboard.data;
using kanbanboard.data.models;
using kanbanboard.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace kanbanboard.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnController : ControllerBase
    {
        private readonly IKanbanboardRepositry _repo;

        public ColumnController(IKanbanboardRepositry kanbanboardRepositry)
        {
            _repo = kanbanboardRepositry;
        }

        [HttpPost]
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

        [HttpDelete("{id:int}")]
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
    }
}
