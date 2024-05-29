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
                        _courses[0].Id.ToString(),
                        _courses[1].Id.ToString(),
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