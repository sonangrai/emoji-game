import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

type SocketMessage<T = any> = {
  type: string;
  payload: T;
};

let wss: WebSocketServer | null = null;

export function setupWebSocket(server: HTTPServer): void {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    ws.on("message", (message: string) => {
      console.log("Received:", message);

      return false;
    });

    // Start keep-alive ping interval
    const interval = setInterval(() => {
      wss?.clients.forEach((ws) => {
        if (!(ws as any).isAlive) {
          console.log("Terminating dead WebSocket");
          return ws.terminate();
        }

        (ws as any).isAlive = false;
        ws.ping(); // client will respond with pong
      });
    }, 30000); // Ping every 30s

    ws.on("close", (code, reason) => {
      clearInterval(interval); // Clear the interval on close
      console.log("WebSocket client disconnected", code, reason.toString());
    });
  });
}

export function broadcast(message: string): void {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export function sendTypedEvent<T>(type: string, payload: T): void {
  const message: SocketMessage<T> = { type, payload };
  wss?.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
