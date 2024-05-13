using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace asp_net_react_fullstack_app.Server.Models;

public class School
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    public string Name { get; set; }
    
    public List<string> Courses { get; set; }
}