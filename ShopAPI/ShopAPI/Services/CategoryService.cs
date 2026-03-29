
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;
namespace ShopAPI.Services
{
    public class CategoryService
    {
        private readonly AppDbContext _db;

        public CategoryService(AppDbContext db) 
        { 
              _db = db;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _db.Categories
           .Include(c => c.Products)
           .ToListAsync();
        }


        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _db.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category> CreateAsync(CategoryDto dto)
        {
            var category = new Category { Name = dto.Name };
            _db.Categories.Add(category);
            await _db.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> UpdateAsync(int id, CategoryDto dto)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null) return null;

            category.Name = dto.Name;
            await _db.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null) return false;

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();
            return true;
        }

    }
}
