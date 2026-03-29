
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;
namespace ShopAPI.Services
{
    public class OrderService
    {
        public readonly AppDbContext _db;

        public OrderService(AppDbContext db)
        {
            _db = db;
        }

        // Get ALL Orders for a User
        public async Task<List<Order>> GetAllAsync()
        {
            return await _db.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.Payment)
                .ToListAsync();
        }

        // Get My Orders (Customer) : Gib mir alle Bestellungen von diesem User
        public async Task<List<object>> GetMyOrdersAsync(int userId)
        {
            var orders = await _db.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.Payment)
                .ToListAsync();

            return orders.Select(o => new
            {
                id = o.Id.ToString(),
                createdAt = o.Createdat,
                status = o.Status,
                total = o.OrderItems.Sum(oi => oi.UnitPrice * oi.Quantity), // ← total berechnen
                payment = o.Payment == null ? null : new
                {
                    method = o.Payment.Method,
                    amount = o.Payment.Amount,
                    status = o.Payment.Status
                },
                items = o.OrderItems.Select(oi => new
                {
                    productId = oi.ProductId,
                    productName = oi.Product != null ? oi.Product.Name : "",
                    quantity = oi.Quantity,
                    unitPrice = oi.UnitPrice
                })
            }).Cast<object>().ToList();
        }

        // Get By ID : Gib mir Die eine Bestellung mit dieser ID
        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _db.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        // Create Order
        public async Task<Order> CreateAsync(int userId, OrderDto dto)
        {
            foreach (var item in dto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if (product == null)
                {
                    throw new Exception($"Produkt {item.ProductId} nciht gefunden");
                }

                if (product.Stock < item.Quantity)
                {
                    throw new Exception($"Nicht genung lager für {product.Name}");
                }
            }

            // Bestellung erstellen
            var order = new Order
            {
                UserId = userId,
                Createdat = DateTime.UtcNow,
                Status = "Pending"
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            // OrderItems
            decimal total = 0;
            foreach (var item in dto.Items)
            {
                var product = await _db.Products.FindAsync(item.ProductId);

                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = product!.Price
                };

                product.Stock -= item.Quantity; // Lager aktualisieren

                _db.OrderItems.Add(orderItem);
            }

            await _db.SaveChangesAsync();
            return await GetByIdAsync(order.Id) ?? order;
        }

        // Cancel order
        public async Task<Order?> CancelAsync(int id, int userId)
        {
            var order = await _db.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null) return null;
            if (order.Status == "Shipped")
                throw new Exception("Versendete Bestellung kann nicht storniert werden");

            // lager zurückgeben
            foreach (var item in order.OrderItems)
            {
                var product = await _db.Products.FindAsync(item.ProductId);
                if(product != null)
                {
                    product.Stock += item.Quantity;
                }
            }

            order.Status = "Cancelled";
            await _db.SaveChangesAsync();
            return order;

        }

        // Update status (Admin)
        public async Task<Order?> UpdatesStatusAsync(int id, string status)
        {
            var order = await _db.Orders.FindAsync(id);
            if(order == null) return null;

            order.Status = status;
            await _db.SaveChangesAsync();
            return order;
        }


    }
}
