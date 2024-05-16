using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace asp_net_react_fullstack_app.Server.Services
{
    public class DBService
    {
        public IMongoDatabase service;
        

        public DBService(IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
        {
            var client = new MongoClient(eLearningPlatformaSettings.Value.ConnectionString);
            service = client.GetDatabase(eLearningPlatformaSettings.Value.DatabaseName);
        }

        public async Task<long> GetCollectionCountAsync(string collectionName)
        {
            var collection = service.GetCollection<BsonDocument>(collectionName);
            return await collection.CountDocumentsAsync(new BsonDocument());
        }

   
    }
}