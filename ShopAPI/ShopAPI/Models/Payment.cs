namespace ShopAPI.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Method { get; set; } = string.Empty; //"CreditCard", "PayPal"
        public string Status { get; set; } = "Pending";
        public DateTime PaidAt { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;
    }
}
