using asp_net_react_fullstack_app.Server.Models;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Migrations
{
    public class CourseMigration
    {
        private readonly IMongoCollection<Course> _courseCollection;

        public CourseMigration(IMongoDatabase database)
        {
            _courseCollection = database.GetCollection<Course>("Courses");
        }

        public async Task MigrateData()
        {
            // Assuming you have a list of courses to migrate
            var courses = new List<Course>
            {
                new() {
                    Title = "Course Title 1",
                    Category = "Category 1",
                    Description = "Description 1",
                    Link = "Link 1",
                    School = "School 1"
                },
                new() {
                    Title = "Course Title 2",
                    Category = "Category 2",
                    Description = "Description 2",
                    Link = "Link 2",
                    School = "School 2"
                },
                // Add more courses as needed
            };

            // Insert the courses into the MongoDB collection
            await _courseCollection.InsertManyAsync(courses);
        }
    }
}
