using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Products> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.ToTable("UserAccounts");
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.ToTable("Products");
            });
        }
    }
}
