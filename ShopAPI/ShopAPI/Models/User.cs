namespace ShopAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string passwordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Customer";
        public ICollection<Order> orders { get; set; } = new List<Order>();
    }
}
