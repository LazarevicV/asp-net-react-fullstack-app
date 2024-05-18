
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using asp_net_react_fullstack_app.Server.Models;
using asp_net_react_fullstack_app.Server.Services;
using MongoDB.Driver;

namespace asp_net_react_fullstack_app.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UsersService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, UsersService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginModel login)
        {
            // Validate credentials (e.g., from database)
            if (!IsValidUser(login.Username, login.Password)) return Unauthorized();
            // Generate JWT token
            var token = GenerateJwtToken(login.Username);
            return Ok(new { token });

        }
        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                    // Add more claims as needed (e.g., roles)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsValidUser(string username, string password)
        {

            var userCollection = _userService.getCollection();
            
            
            var user = userCollection.Find(u => u.Username == username).FirstOrDefault();

            if (user == null)
                return false;

            return VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
        }
        
        private bool VerifyPasswordHash(string password, byte[] passwordHashFromDb, byte[] passwordSaltFromDb)
        {
            using var hmac = new HMACSHA512(passwordSaltFromDb);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Convert the Base64 string from the database to bytes
            var databaseHashBytes = Convert.FromBase64String(Convert.ToBase64String(passwordHashFromDb));

            // Compare the computed hash with the hash from the database byte by byte
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != databaseHashBytes[i])
                {
                    Console.WriteLine("Hashes don't match at index: " + i);
                    return false;
                }
            }

            return true;
        }



        
        [HttpPost("register")]
        public IActionResult Register(RegisterModel register)
        {
            var userCollection = _userService.getCollection();

            // Check if the username is already taken
            if (IsUsernameTaken(register.Username))
            {
                return Conflict("Username is already taken");
            }

            // Hash the password
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(register.Password, out passwordHash, out passwordSalt);

            // Save the user to the database
            var user = new User
            {
                Username = register.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
            userCollection.InsertOne(user);

            // Generate JWT token
            var token = GenerateJwtToken(register.Username);
            return Ok(new { token });
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private bool IsUsernameTaken(string username)
        {
            var userCollection = _userService.getCollection();
            
            var user = userCollection.Find(u => u.Username == username).FirstOrDefault();
            return user != null;
        }
    }
    
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    
    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        // You can add more properties as needed, such as email, name, etc.
    }
}
