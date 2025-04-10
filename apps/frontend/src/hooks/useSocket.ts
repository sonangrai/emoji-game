import { BASE_URL, SOCKET_URL } from "@/api/config";
import { useEffect, useRef } from "react";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("Connected to backend WebSocket");
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket closed", event);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { socketRef };
}
