using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("greetings")]
public class GreetingsController : ControllerBase
{
    private readonly ApiDbContext _context;

    public GreetingsController(ApiDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var greetings = await _context.Greetings.ToListAsync();
        return Ok(greetings);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Greeting greeting)
    {
        _context.Greetings.Add(greeting);
        await _context.SaveChangesAsync();
        return Ok(greeting);
    }
}