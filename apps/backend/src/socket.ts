// socket.ts
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { leaveRoom } from "./controller/room";
import Room from "./model/Room";
import { LEAVE_ROOM } from "./events/room";
import User from "./model/User";

let io: SocketIOServer;

export function initSocket(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("PLAYER:LEFT", async (d) => {
      const userData = await User.findById(d.pid);

      await Room.findOneAndUpdate(
        {
          _id: d.rid,
          "players.user": d.pid,
        },
        {
          $set: {
            "players.$.online": false,
          },
        },
        { new: true }
      );

      io.emit(LEAVE_ROOM, {
        userId: d.pid,
        nickname: userData?.nickname,
      });
    });
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
