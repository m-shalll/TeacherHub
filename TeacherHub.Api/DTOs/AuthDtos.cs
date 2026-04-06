namespace TeacherHub.Api.DTOs;

public record SignupRequest(string FullName, string Email, string Password, string Curriculum);
public record LoginRequest(string Email, string Password);
public record AuthResponse(string Token, string Email, string FullName, string? Curriculum = null);
