using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace asp_net_react_fullstack_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolsController(SchoolsService schoolsService) : ControllerBase
    {
        // GET: api/<SchoolsController>
        [HttpGet]
        public async Task<ActionResult<List<School>>> GetSchools()
        {
            var schools = await schoolsService.GetAllSchoolAsync();
            return Ok(schools);
        }

        // GET api/<SchoolsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SchoolsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SchoolsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SchoolsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
