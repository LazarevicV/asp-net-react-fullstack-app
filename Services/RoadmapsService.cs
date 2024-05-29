using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Services;

public class RoadmapsService
{
    private readonly IMongoCollection<Roadmap> _roadmapsCollection;
    public RoadmapsService(DBService db, IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
    {
        _roadmapsCollection = db.service.GetCollection<Roadmap>(eLearningPlatformaSettings.Value.RoadmapsCollectionName);
    }

    public async Task<List<Roadmap>> GetAllRoadmapsAsync()
    {
        return await _roadmapsCollection.Find(_ => true).ToListAsync();
    }
}