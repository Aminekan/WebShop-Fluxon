using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DTOs;
using ShopAPI.Services;
using System.Security.Claims;
namespace ShopAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentService _paymentService;

        public PaymentController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Post api/payment/pay/{orderId} (Bestellung bezahlen)
        [HttpPost("pay/{orderId}")]
        public async Task<IActionResult> Pay(int orderId, PaymentDto dto)
        {
            try
            {
                var payment = await _paymentService.PayAsync(orderId, GetUserId(), dto);
                return Ok(payment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
