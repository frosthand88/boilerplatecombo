﻿using BoilerplateCombo.Models;
using BoilerplateCombo.Service;
using Microsoft.AspNetCore.Mvc;

namespace BoilerplateCombo.Controllers;

[ApiController]
[Route("postgres/researcher")]
public class PostgresResearcherController : ControllerBase
{
    private readonly PostgresResearcherService _service;

    public PostgresResearcherController(PostgresResearcherService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetResearchers(int page = 1, int pageSize = 25, string sortBy = "id", bool ascending = true, string? filter = null)
    {
        var (researchers, totalCount) = await _service.GetResearchersAsync(page, pageSize, sortBy, ascending, filter);
        return Ok(new { data = researchers, totalCount });
    }

    [HttpGet("export")]
    public async Task<IActionResult> ExportResearchers()
    {
        var csv = await _service.ExportResearchersAsCsvAsync();
        return File(System.Text.Encoding.UTF8.GetBytes(csv), "text/csv", "researchers.csv");
    }

    [HttpPost]
    public async Task<IActionResult> AddResearcher([FromBody] Researcher researcher)
    {
        var added = await _service.AddResearcherAsync(researcher);
        return CreatedAtAction(nameof(GetResearchers), new { id = added.id }, added);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateResearcher(int id, [FromBody] Researcher researcher)
    {
        var updated = await _service.UpdateResearcherAsync(id, researcher);
        if (!updated)
            return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResearcher(int id)
    {
        var deleted = await _service.DeleteResearcherAsync(id);
        if (!deleted)
            return NotFound();
        return NoContent();
    }
}