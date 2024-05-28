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
    public class CoursesController(CoursesService coursesService, IWebHostEnvironment environment, SchoolsService
            schoolsService) :
        ControllerBase
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
        public async Task<IActionResult> Post([FromForm] CourseDto courseDto)
        {
            if (courseDto == null)
            {
                return BadRequest("Course is null.");
            }

            var course = new Course
            {
                Title = courseDto.Title,
                Category = courseDto.Category,
                Description = courseDto.Description,
                Link = courseDto.Link,
                School = courseDto.School
            };

            if (courseDto.File != null)
            {
                var clientProjectPath = Path.Combine(environment.ContentRootPath, ".", "asp-net-react-fullstack-app.client");
                var uploadsFolderPath = Path.Combine(clientProjectPath, "public");

                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + courseDto.File.FileName;
                var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await courseDto.File.CopyToAsync(stream);
                }

                course.FilePath =  uniqueFileName; // Store the relative path to the file
            }

            course.Id = ObjectId.GenerateNewId().ToString();
            await coursesService.CreateCourseAsync(course);

            // Update corresponding school
            var schools = await schoolsService.GetAllSchoolAsync();
            var matchingSchool = schools.FirstOrDefault(s => s.Name == course.School);

            if (matchingSchool != null)
            {
                matchingSchool.Courses.Add(course.Id);
                await schoolsService.UpdateSchoolAsync(matchingSchool.Id, matchingSchool);
            }

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }


        // PUT api/Courses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromForm] CourseDto courseDto)
        {
            if (courseDto == null)
            {
                return BadRequest("Course is null.");
            }

            if (!ObjectId.TryParse(id, out ObjectId objectId))
            {
                return BadRequest("Invalid ObjectId format.");
            }

            var existingCourse = await coursesService.GetCourseByIdAsync(objectId);
            if (existingCourse == null)
            {
                return NotFound();
            }

            var originalSchoolName = existingCourse.School;

            existingCourse.Title = courseDto.Title;
            existingCourse.Category = courseDto.Category;
            existingCourse.Description = courseDto.Description;
            existingCourse.Link = courseDto.Link;
            existingCourse.School = courseDto.School;

            // Console.WriteLine("original school name" + originalSchoolName);
            // Console.WriteLine("existing course school" + existingCourse.School);

            if (courseDto.File != null)
            {
                var clientProjectPath = Path.Combine(environment.ContentRootPath, ".", "asp-net-react-fullstack-app.client");
                var uploadsFolderPath = Path.Combine(clientProjectPath, "public");

                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var uniqueFileName = courseDto.File.FileName;
                var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

                // Ensure file name is unique by checking if the file already exists
                var counter = 1;
                while (System.IO.File.Exists(filePath))
                {
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(uniqueFileName);
                    var extension = Path.GetExtension(uniqueFileName);
                    uniqueFileName = $"{fileNameWithoutExtension}_{counter}{extension}";
                    filePath = Path.Combine(uploadsFolderPath, uniqueFileName);
                    counter++;
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await courseDto.File.CopyToAsync(stream);
                }
                existingCourse.FilePath = "/public/" + uniqueFileName; // Store the relative path to the file
            }

            await coursesService.UpdateCourseAsync(objectId, existingCourse);

            // Update schools if the school name has changed
            if (existingCourse.School != originalSchoolName)
            {
                // Fetch all schools
                var schools = await schoolsService.GetAllSchoolAsync();

                foreach (var school in schools)
                {
                    // If the course was previously associated with this school, remove it
                    if (school.Courses.Contains(existingCourse.Id))
                    {
                        school.Courses.Remove(existingCourse.Id);
                        await schoolsService.UpdateSchoolAsync(school.Id, school);
                    }

                    // If the course is now associated with this school, add it
                    if (school.Name == existingCourse.School)
                    {
                        school.Courses.Add(existingCourse.Id);
                        await schoolsService.UpdateSchoolAsync(school.Id, school);
                    }
                }
            }

            return NoContent();
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

            // Get the corresponding school
            var schools = await schoolsService.GetAllSchoolAsync();
            var matchingSchool = schools.FirstOrDefault(s => s.Name == course.School);

            if (matchingSchool != null)
            {
                // Remove the course ID from the school's Courses array
                matchingSchool.Courses.Remove(id);
                await schoolsService.UpdateSchoolAsync(matchingSchool.Id, matchingSchool);
            }

            await coursesService.DeleteCourseAsync(id);
            return NoContent();
        }


        // GET: api/Course/Categories
        [HttpGet("Categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await coursesService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        public class CourseDto
        {
            public string? Title { get; set; }
            public string? Category { get; set; }
            public string? Description { get; set; }
            public string? Link { get; set; }
            public string? School { get; set; }
            public IFormFile? File { get; set; } // For file upload
        }
    }
}
