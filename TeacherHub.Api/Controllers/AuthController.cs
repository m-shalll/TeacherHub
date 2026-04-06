using Microsoft.AspNetCore.Mvc;
using TeacherHub.Api.DTOs;
using TeacherHub.Api.Services;

namespace TeacherHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _auth;

    public AuthController(AuthService auth) => _auth = auth;

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
    {
        var result = await _auth.SignupAsync(request);
        if (!result.Ok)
            return BadRequest(new { message = result.Message });

        return Ok(new { token = result.Token, email = result.Email, fullName = result.FullName, curriculum = result.Curriculum });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _auth.LoginAsync(request);
        if (!result.Ok)
            return BadRequest(new { message = result.Message });

        return Ok(new { token = result.Token, email = result.Email, fullName = result.FullName, curriculum = result.Curriculum });
    }
}
