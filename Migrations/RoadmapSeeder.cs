using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Migrations;

public class RoadmapSeeder
{
    private readonly IMongoCollection<Roadmap> _roadmapCollection;
    private readonly IMongoCollection<Course> _coursesCollection;
    private List<Course> _courses;

    public RoadmapSeeder(IMongoDatabase database)
    {
        _roadmapCollection = database.GetCollection<Roadmap>("Roadmaps");
        _coursesCollection = database.GetCollection<Course>("Courses");
    }

    public async Task SeedRoadmapData()
    {

        Console.WriteLine("Starting roadmap data seeding...");
        try
        {
            _courses = await _coursesCollection.Find(course => true).ToListAsync();
            var roadmaps = new List<Roadmap>
            {
                new() {
                    Name = "Python Roadmap",
                    Description = "A comprehensive roadmap for aspiring young programmers to learn python…",
                    Courses = [
                        _courses[26].Id.ToString(),
                        _courses[0].Id.ToString(),
                        _courses[27].Id.ToString(),
                        _courses[28].Id.ToString(),
                    ]
                },

                new() {
                    Name = "Mathematics Roadmap",
                    Description = "A comprehensive roadmap for aspiring young students to learn math…",
                    Courses = [
                        _courses[25].Id.ToString(),
                        _courses[6].Id.ToString(), // get ready for algebra 1
                        _courses[24].Id.ToString(),
                        _courses[22].Id.ToString(),
                        _courses[23].Id.ToString(),
                    ]
                }
            };

            Console.WriteLine("Roadmap data seeding completed successfully.");
            await _roadmapCollection.InsertManyAsync(roadmaps);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while roadmap data: {ex.Message}");
        }
    }
}