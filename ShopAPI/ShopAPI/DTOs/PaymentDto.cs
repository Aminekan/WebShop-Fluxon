namespace ShopAPI.DTOs
{
    public class PaymentDto
    {
        public string Method { get; set; } = string.Empty; // "CreditCard", "PayPal", "Cach".
    }
}
