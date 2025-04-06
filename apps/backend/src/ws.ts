import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

let wss: WebSocketServer | null = null;

export function setupWebSocket(server: HTTPServer): void {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    ws.on("message", (message: string) => {
      console.log("Received:", message);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
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
