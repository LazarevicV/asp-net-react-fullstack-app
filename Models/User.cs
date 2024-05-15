using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace asp_net_react_fullstack_app.Server.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Role { get; set; }

    [BsonRepresentation(BsonType.Binary)]
    public byte[] PasswordHash { get; set; }

    [BsonRepresentation(BsonType.Binary)]
    public byte[] PasswordSalt { get; set; }
}