namespace ShopAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Createdat { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending";
        public int UserId { get; set; }
        public User? User { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public Payment? Payment { get; set; }
    }
}
