using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DTOs;
using ShopAPI.Models;
using ShopAPI.Services;
using System.Security.Claims;
namespace ShopAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // hilfsmethode - eingeloggten User ID bekommen
        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Get api/order (Admin -> alle Bestellungen)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(orders);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyOrders()
        {
            var orders = await _orderService.GetMyOrdersAsync(GetUserId());
            return Ok(orders);
        }

        // Get api/order/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if(order == null) return NotFound(new {message = "Bestellung nicht gefunden"});
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderDto dto)
        {
            try
            {
                var order = await _orderService.CreateAsync(GetUserId(), dto);
                return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            try
            {
                var order = await _orderService.CancelAsync(id, GetUserId());
                if (order == null) return NotFound(new { message = "Bestellung nicht gefunden" });
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateStatusDto dto)
        {
            var order = await _orderService.UpdatesStatusAsync(id, dto.Status);
            if (order == null) return NotFound(new { message = "Bestellung nicht gefunden" });
            return Ok(order);
        }
    }
    }
