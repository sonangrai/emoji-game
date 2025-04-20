import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { getCookie } from "@/lib/cookie";
import { useParams, usePathname } from "next/navigation";

export type RoomEvent = {
  playerId: string;
  nickname: string;
  type: "JOIN" | "LEAVE";
};

function useRoom() {
  const playerId = JSON.parse(getCookie("player"))._id;
  const { id } = useParams();
  const socket = useSocket();
  const [roomEve, setRoomEve] = useState<RoomEvent[] | []>([]);

  useEffect(() => {
    // Browser close event
    const listenDisconnect = () => {
      socket.volatile.emit("PLAYER:LEFT", { pid: playerId, rid: id });
    };

    window.addEventListener("beforeunload", listenDisconnect);

    socket.on("ROOM:JOIN", (data) => {
      setRoomEve(
        produce((draft) => {
          const newRoomEve = draft as RoomEvent[];
          newRoomEve.push({
            playerId: data.userId,
            nickname: data.nickname,
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
            nickname: data.nickname,
            type: "LEAVE",
          });
        })
      );
    });

    return () => {
      socket.off("ROOM:JOIN");
      socket.off("ROOM:LEAVE");
      window.removeEventListener("beforeunload", listenDisconnect);
    };
  }, [socket]);

  // Toast cleaner
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
