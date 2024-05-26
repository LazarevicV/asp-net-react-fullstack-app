using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Services;

public class CoursesService
{
    private readonly IMongoCollection<Course> _coursesCollection;

    public CoursesService(IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
    {
        var client = new MongoClient(eLearningPlatformaSettings.Value.ConnectionString);
        var database = client.GetDatabase(eLearningPlatformaSettings.Value.DatabaseName);
        _coursesCollection = database.GetCollection<Course>(eLearningPlatformaSettings.Value.CoursesCollectionName);
    }

    public async Task<List<Course>> GetAllCoursesAsync()
    {
        return await _coursesCollection.Find(_ => true).ToListAsync();
    }

    public async Task<List<string>> GetAllCategoriesAsync()
    {
        var categories = await _coursesCollection.Distinct(c => c.Category, _ => true).ToListAsync();
        return categories;
    }

    public async Task<Course> GetCourseByIdAsync(ObjectId id)
    {
        return await _coursesCollection.Find(course => course.Id == id.ToString()).FirstOrDefaultAsync();
    }

    public async Task CreateCourseAsync(Course course)
    {
        await _coursesCollection.InsertOneAsync(course);
    }

    public async Task DeleteCourseAsync(string id)
    {
        await _coursesCollection.DeleteOneAsync(course => course.Id == id);
    }

    public async Task UpdateCourseAsync(ObjectId id, Course updatedCourse)
    {
        await _coursesCollection.ReplaceOneAsync(course => course.Id == id.ToString(), updatedCourse);
    }
}