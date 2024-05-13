using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
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
}