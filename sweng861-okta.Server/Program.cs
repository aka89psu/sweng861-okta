
using AspNetCoreRateLimit;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace unit3.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var settings = builder.Configuration.GetRequiredSection("Settings").Get<Settings>();

            var apiDatabase = settings?.ApiDatabase;
            var apiDatabaseType = settings?.ApiDatabaseType;

            builder.Services.AddSingleton(new Settings { ApiDatabase = apiDatabase, ApiDatabaseType = apiDatabaseType });

            builder.Services.AddControllers();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.Run();
        }
    }
}
