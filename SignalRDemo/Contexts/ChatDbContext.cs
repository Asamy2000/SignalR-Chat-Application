using Microsoft.EntityFrameworkCore;
using SignalRDemo.Models;

namespace SignalRDemo.Contexts
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }
    }
}
