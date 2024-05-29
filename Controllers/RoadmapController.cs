using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace asp_net_react_fullstack_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoadmapController(RoadmapsService roadmapsService) : ControllerBase
    {
        // GET: api/<RoadmapController>
        [HttpGet]
        public async Task<ActionResult<List<Roadmap>>> GetRoadmaps()
        {
            var roadmaps = await roadmapsService.GetAllRoadmapsAsync();
            return Ok(roadmaps);
        }

        // GET api/<RoadmapController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RoadmapController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RoadmapController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RoadmapController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
