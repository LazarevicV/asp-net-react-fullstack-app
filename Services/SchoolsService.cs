using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Services;

public class SchoolsService
{
   private readonly IMongoCollection<School> _schoolsCollection;

        public SchoolsService(DBService db, IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
        {
            _schoolsCollection = db.service.GetCollection<School>(eLearningPlatformaSettings.Value.SchoolsCollectionName);
        }

        public async Task<List<School>> GetAllSchoolAsync()
        {
            return await _schoolsCollection.Find(_ => true).ToListAsync();
        }
}