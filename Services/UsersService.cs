using asp_net_react_fullstack_app.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UsersService(DBService db, IOptions<ELearningPlatformaSettings> eLearningPlatformaSettings)
    {
        _usersCollection = db.service.GetCollection<User>(eLearningPlatformaSettings.Value.UsersCollectionName);
    }

    public IMongoCollection<User> getCollection()
    {
        return _usersCollection;
    }
}