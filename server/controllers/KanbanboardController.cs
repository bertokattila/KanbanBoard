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

        // GET: api/board
        [HttpGet("board")]
        public JsonResult Get()
        {
            return new JsonResult(_repo.GetBoard(), new JsonSerializerOptions());
        }

        [HttpGet("cards")]
        public async Task<ActionResult> GetCards()
        {
            return Ok(await _repo.GetCards());
        }

    }
}
