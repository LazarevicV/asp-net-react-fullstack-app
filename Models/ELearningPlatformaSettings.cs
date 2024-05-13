namespace asp_net_react_fullstack_app.Server.Models;

public class ELearningPlatformaSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string CoursesCollectionName { get; set; } = null!;
    
    public string SchoolCollectionName { get; set; } = null!;
    
    public string UsersCollectionName { get; set; } = null!;
}