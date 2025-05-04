import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onerror = (e) => console.error("WebSocket error", e);
    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [url]);

  return messages;
}
