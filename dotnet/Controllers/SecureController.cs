using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BoilerplateCombo.Controllers;

[ApiController]
[Route("secure")]
public class SecureController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult Get() => Ok("You are authenticated via JWT!");
}
