using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Services;

public class SchoolsService
{
    private readonly IMongoCollection<School> _schoolsCollection;

    public SchoolsService(IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
    {
        var client = new MongoClient(eLearningPlatformaSettings.Value.ConnectionString);
        var database = client.GetDatabase(eLearningPlatformaSettings.Value.DatabaseName);
        _schoolsCollection = database.GetCollection<School>(eLearningPlatformaSettings.Value.SchoolsCollectionName);
    }

    public async Task<List<School>> GetAllSchoolAsync()
    {
        return await _schoolsCollection.Find(_ => true).ToListAsync();
    }
}