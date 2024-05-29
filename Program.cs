using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using asp_net_react_fullstack_app.Server.Migrations;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.Configure<ELearningPlatformaSettings>(
    builder.Configuration.GetSection("eLearningPlatforma"));

builder.Services.AddSingleton<CoursesService>();
// builder.Services.AddSingleton<DBService>();
// builder.Services.AddSingleton<SchoolsService>();

builder.Services.AddScoped<DBService>();
builder.Services.AddScoped<CoursesService>();
builder.Services.AddScoped<SchoolsService>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<RoadmapsService>();

// Configure JWT authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Note: In production, set it to true.
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, // You may set it to true if issuer validation is required.
        ValidateAudience = false // You may set it to true if audience validation is required.
    };
});

var app = builder.Build();

// Migrate data before starting the application
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbService = services.GetRequiredService<DBService>();

        var coursesCount = await dbService.GetCollectionCountAsync("Courses");
        var schoolsCount = await dbService.GetCollectionCountAsync("Schools");
        var roadmapsCount = await dbService.GetCollectionCountAsync("Roadmaps");

        if (coursesCount < 1) // checks if there is no data in the database
        {
            var courseMigrationService = new CourseSeeder(dbService.service);
            await courseMigrationService.MigrateData();
        }

        if (schoolsCount < 1) // checks if there is no data in the database
        {
            // Seed school data
            var schoolMigrationService = new SchoolSeeder(dbService.service);
            await schoolMigrationService.SeedSchoolDataAsync();
        }

        if (roadmapsCount < 1)
        {
            var roadmapsMigrationService = new RoadmapSeeder(dbService.service);
            await roadmapsMigrationService.SeedRoadmapData();
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating data.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAnyOrigin"); // Enable CORS before other middleware.
app.UseAuthentication(); // Use authentication middleware before authorization.
app.UseAuthorization();

app.MapControllers();

app.Run();
