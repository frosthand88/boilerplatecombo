import {useWebSocket} from "./useWebSocket";

export function WebSocketViewer() {
    const messages = useWebSocket("https://api.frosthand.com/dotnet/ws");

    return (
        <div>
            <h3>WebSocket Messages</h3>
            {messages.map((msg, idx) => (
                <div key={idx}>
                    {msg.type === "typeA" ? (
                        <p style={{ color: "blue" }}>
                            [A] {msg.timestamp} - {msg.message}
                        </p>
                    ) : (
                        <p style={{ color: "green" }}>
                            [B] {msg.timestamp} - {msg.message}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
