using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) {}
    
    public DbSet<Greeting> Greetings { get; set; }
}