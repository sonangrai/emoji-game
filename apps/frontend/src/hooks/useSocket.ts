import { BASE_URL } from "@/api/config";
import { useEffect, useRef } from "react";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${BASE_URL.replace("http", "ws")}`);

    socketRef.current.onopen = () => {
      console.log("Connected to backend WebSocket");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { socketRef };
}
