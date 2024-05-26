using System.Runtime.InteropServices.JavaScript;
using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace asp_net_react_fullstack_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController(CoursesService coursesService) : ControllerBase
    {
        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<List<Course>>> GetCourses()
        {
            var courses = await coursesService.GetAllCoursesAsync();
            return Ok(courses);
        }

        // GET api/<CoursesController>/664883b921630257970127ba
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format");
            }

            var course = await coursesService.GetCourseByIdAsync(objectId);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // POST api/Courses
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Course course)
        {
            if (course == null)
            {
                return BadRequest("Course is null.");
            }

            await coursesService.CreateCourseAsync(course);
            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        // PUT api/<CoursesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var course = await coursesService.GetCourseByIdAsync(ObjectId.Parse(id));
            if (course == null)
            {
                return NotFound();
            }

            await coursesService.DeleteCourseAsync(id.ToString());
            return NoContent();
        }

        // GET: api/Course/Categories
        [HttpGet("Categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await coursesService.GetAllCategoriesAsync();
            return Ok(categories);
        }
    }
}
