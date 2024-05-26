using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace asp_net_react_fullstack_app.Server.Models;

public class Course
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    public string? Title { get; set; }
    
    public string? Category { get; set; }
    
    public string? Description { get; set; }
    
    public string? Link { get; set; }
    
    public string? School { get; set; }

    public string? FilePath { get; set; }
}