using ShopAPI.Models;

namespace ShopAPI.DTOs
{
    public class OrderDto
    {
        public List<OrderItemDto> Items { get; set; } = new();
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
