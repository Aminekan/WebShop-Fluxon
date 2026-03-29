using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;

namespace ShopAPI.Services
{
    public class ProductService
    {
        private readonly AppDbContext _db;

        public ProductService(AppDbContext db)
        {
            _db = db;
        }

        // Get ALL
        public async Task<List<Product>> GetALLAsync()
        {
            return await _db.Products
                .Include(p => p.Category)
                .ToListAsync();
        }

        // GET BY ID
        public async Task<Product?> GetByAsync(int id)
        {
             return await _db.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
        }

        // Create
        public async Task<Product> CreateAsync(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();
            return product;
        }

        // Update
        public async Task<Product?> UpdateAsync(int id, ProductDto dto)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return null;

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.Stock = dto.Stock;
            product.CategoryId = dto.CategoryId;
            product.ImageUrl = dto.ImageUrl;

            await _db.SaveChangesAsync();
            return product;
        }

        // DELETE 
        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null) return false;

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
