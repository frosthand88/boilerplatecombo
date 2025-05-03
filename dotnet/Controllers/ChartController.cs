using BoilerplateCombo.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BoilerplateCombo.Models;

[ApiController]
[Route("api/[controller]")]
public class ChartController : ControllerBase
{
    private readonly AppDbContext _db;

    public ChartController(AppDbContext db) => _db = db;

    [HttpGet("{symbol}")]
    public IActionResult GetChart(
        string symbol,
        [FromQuery] int offset = 0,
        [FromQuery] int limit = 100)
    {
        var data = _db.stock_data
            .Where(s => s.symbol == symbol)
            .OrderByDescending(s => s.record_date)
            .Skip(offset)
            .Take(limit)
            .OrderBy(s => s.record_date) // re-order after skip/take
            .Select(s => new {
                date = s.record_date,
                open = s._open,
                high = s._high,
                low = s._low,
                close = s._close,
                volume = s._volume
            })
            .ToList();

        return Ok(data);
    }
}