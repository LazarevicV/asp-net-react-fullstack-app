using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

builder.Services.AddScoped<CoursesService>();
builder.Services.AddScoped<SchoolsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAnyOrigin"); // Enable CORS before other middleware.
app.UseAuthorization();

app.MapControllers();

app.Run();
