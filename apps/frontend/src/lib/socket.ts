// lib/socket.ts
import { SOCKET_URL } from "@/api/config";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["websocket"], // optional: for performance
    });
  }
  return socket;
};
