import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";
import { produce } from "immer";

export type RoomEvent = {
  playerId: string;
  type: "JOIN" | "LEAVE";
};

function useRoom() {
  const socket = useSocket();
  const [roomEve, setRoomEve] = useState<RoomEvent | []>([]);

  useEffect(() => {
    socket.on("ROOM:JOIN", (data: RoomEvent) => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.push({
            playerId: data.playerId,
            type: "JOIN",
          });
          return newRoomEve;
        })
      );
    });

    socket.on("ROOM:LEAVE", (data: RoomEvent) => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.push({
            playerId: data.playerId,
            type: "LEAVE",
          });
        })
      );
    });

    return () => {
      socket.off("ROOM:JOIN");
      //   socket.off("ROOM:LEAVE");
    };
  }, [socket]);

  return {
    roomEve,
  };
}

export default useRoom;
