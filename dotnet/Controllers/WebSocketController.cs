using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace BoilerplateCombo.Controllers;

[ApiController]
[Route("/ws")]
public class WebSocketController : ControllerBase
{
    [HttpGet]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            var random = new Random();

            while (socket.State == WebSocketState.Open)
            {
                var payload = new
                {
                    type = random.Next(2) == 0 ? "typeA" : "typeB",
                    timestamp = DateTime.UtcNow,
                    message = "Hello from server!"
                };

                var json = JsonSerializer.Serialize(payload);
                var bytes = Encoding.UTF8.GetBytes(json);
                var buffer = new ArraySegment<byte>(bytes);

                await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                await Task.Delay(TimeSpan.FromSeconds(random.Next(1, 16)));
            }

            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Done", CancellationToken.None);
        }
        else
        {
            HttpContext.Response.StatusCode = 400;
        }
    }
}
