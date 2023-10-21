using Microsoft.EntityFrameworkCore;
using SignalRDemo.Contexts;
using SignalRDemo.Hups;

namespace SignalRDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register Dbcontext Services

            builder.Services.AddDbContext<ChatDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Register signalR services

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/Chat");
            });

            app.Run();
        }
    }
}
