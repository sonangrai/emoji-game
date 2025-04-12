// lib/socket.ts
import { SOCKET_URL } from "@/api/config";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // optional: for performance
    });
  }
  return socket;
};
