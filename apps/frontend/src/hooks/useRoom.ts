import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";
import { produce } from "immer";

export type RoomEvent = {
  playerId: string;
  type: "JOIN" | "LEAVE";
};

function useRoom() {
  const socket = useSocket();
  const [roomEve, setRoomEve] = useState<RoomEvent[] | []>([]);

  useEffect(() => {
    socket.on("ROOM:JOIN", (data) => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.push({
            playerId: data.userId,
            type: "JOIN",
          });
          return newRoomEve;
        })
      );
    });

    socket.on("ROOM:LEAVE", (data) => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.push({
            playerId: data.userId,
            type: "LEAVE",
          });
        })
      );
    });

    return () => {
      socket.off("ROOM:JOIN");
      socket.off("ROOM:LEAVE");
    };
  }, [socket]);

  useEffect(() => {
    const cleanerInterval = setTimeout(() => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.pop();
          return newRoomEve;
        })
      );
    }, 4000);

    return () => clearInterval(cleanerInterval);
  }, [roomEve]);

  return {
    roomEve,
  };
}

export default useRoom;
