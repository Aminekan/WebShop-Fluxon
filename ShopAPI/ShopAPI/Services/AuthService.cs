using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens; // Hinzugefügt für SymmetricSecurityKey
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
namespace ShopAPI.Services
{
    public class AuthService
    {

        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        // Register
        public async Task<string> RegisterAsync(RegisterDto dto)
        {
            // hier ob email breits vergeben ist 
            if(_db.Users.Any(u => u.email == dto.Email))
            {
                 throw new Exception("Email already in use");
            }

            var user = new User
            {
                name = dto.Name,
                email = dto.Email,
                passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Customer"
            };

            // hna i make spricher im db
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Direkt einloggen -> JWT token zurückgeben
            return GenerateToken(user);
        }
        // Login
        public async Task<string> LoginAsysc(LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.email == dto.Email);

            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.passwordHash))
            {
                throw new Exception("Invalid email or password");
            }

            return GenerateToken(user);

        }

        // Jwttoken geben
        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey( 
                Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer : _config["Jwt:Issuer"],
                audience : _config["Jwt:Audience"],
                claims : claims,
                expires : DateTime.Now.AddDays(7),
                signingCredentials : creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
