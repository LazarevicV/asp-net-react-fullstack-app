using asp_net_react_fullstack_app.Server.Models;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Migrations
{
    public class SchoolSeeder
    {
        private readonly IMongoCollection<Course> _courseCollection;
        private readonly IMongoCollection<School> _schoolCollection;

        public SchoolSeeder(IMongoDatabase database)
        {
            _courseCollection = database.GetCollection<Course>("Courses");
            _schoolCollection = database.GetCollection<School>("Schools");
        }

        public async Task SeedSchoolDataAsync()
        {
            Console.WriteLine("Starting school data seeding...");
            try
            {
                var schools = new List<School>
                {
                    new School { Name = "Khan Academy" },
                    new School { Name = "Coursera" },
                    new School { Name = "The Open University" },
                    new School { Name = "Saylor" },
                    new School { Name = "Alison" },
                    new School { Name = "EDX" }
                    // Add more schools as needed
                };

                foreach (var school in schools)
                {
                    var courses = await _courseCollection.Find(course =>
                        course.School.ToLowerInvariant().Contains(school.Name.ToLowerInvariant())).ToListAsync();

                    school.Courses = courses.Select(course => course.Id.ToString()).ToList();

                    await _schoolCollection.InsertOneAsync(school);
                }
                Console.WriteLine("School data seeding completed successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while seeding school data: {ex.Message}");
            }
        }

    }
}
