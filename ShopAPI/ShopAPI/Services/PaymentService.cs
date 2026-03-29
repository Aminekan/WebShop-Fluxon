using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;

namespace ShopAPI.Services
{
    public class PaymentService
    {
        public readonly AppDbContext _db;

        public PaymentService(AppDbContext db)
        {
            _db = db;
        }

        // Pay Order
        public async Task<Payment> PayAsync(int orderId, int uderId, PaymentDto dto)
        {
            var order = await _db.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == uderId);

            if(order == null)
                throw new Exception("Order not found");
            if(order.Status == "Cancelled")
                throw new Exception("Stornierte Bestellung kann nciht bezahlt werden");

            // Prüfen ob schon bezahlt
            var existing = await _db.Payments.FirstOrDefaultAsync(p => p.OrderId == orderId);
            if(existing != null)
                throw new Exception("Bestellung wurde bereits bezahlt");

            // Gesamtbetrag berechnen
            var amount = order.OrderItems.Sum(oi => oi.Quantity * oi.UnitPrice);

            var payment = new Payment
            {

                OrderId = orderId,
                Amount = amount,
                Method = dto.Method,
                Status = "Paid",
                PaidAt = DateTime.UtcNow
            };

            order.Status = "Paid";
            _db.Payments.Add(payment);
            await _db.SaveChangesAsync();
            return payment;
        }
    }
}
