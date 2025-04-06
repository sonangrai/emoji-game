import { BASE_URL } from "@/api/config";
import { useEffect, useRef } from "react";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${BASE_URL.replace("http", "ws")}`);

    socketRef.current.onopen = () => {
      console.log("Connected to backend WebSocket");
      socketRef.current?.send("Hello from frontend!");
    };

    socketRef.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = (msg: string) => {
    socketRef.current?.send(msg);
  };

  return { sendMessage };
}
