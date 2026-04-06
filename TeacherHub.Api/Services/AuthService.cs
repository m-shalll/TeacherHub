using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TeacherHub.Api.Data;
using TeacherHub.Api.DTOs;
using TeacherHub.Api.Models;

namespace TeacherHub.Api.Services;

public class AuthService(AppDbContext db, IConfiguration config)
{
    public async Task<AuthResult> SignupAsync(SignupRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await db.Users.AnyAsync(u => u.Email == email))
            return new AuthResult(false, "An account with this email already exists.");

        if (request.Password.Length < 6)
            return new AuthResult(false, "Password must be at least 6 characters.");

        var user = new StudentUser
        {
            FullName = request.FullName.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Curriculum = request.Curriculum,
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        var token = GenerateToken(user);
        return new AuthResult(true, null, token, user.Email, user.FullName, user.Curriculum);
    }

    public async Task<AuthResult> LoginAsync(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
            return new AuthResult(false, "No account exists with this email address.");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return new AuthResult(false, "Wrong password. Please try again.");

        var token = GenerateToken(user);
        return new AuthResult(true, null, token, user.Email, user.FullName, user.Curriculum);
    }

    private string GenerateToken(StudentUser user)
    {
        var key = Encoding.UTF8.GetBytes(config["Jwt:Secret"]!);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FullName),
        };

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public record AuthResult(bool Ok, string? Message, string? Token = null, string? Email = null, string? FullName = null, string? Curriculum = null);
