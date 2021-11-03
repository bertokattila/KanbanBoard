using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace kanbanboard
{
    [Route("api/")]
    [ApiController]
    public class KanbanboardController : ControllerBase
    {
        private readonly KanbanboardRepository _repo;

        public KanbanboardController()
        {
            _repo = new KanbanboardRepository();
        }

        // GET: api/TodoItems
        [HttpGet("board")]
        public JsonResult Get()
        {
            return new JsonResult(_repo.GetBoard(), new JsonSerializerOptions());
        }

    }
}
