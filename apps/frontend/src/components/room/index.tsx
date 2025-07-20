"use client";
import { useQuery } from "@tanstack/react-query";
import ChatBox from "./chat-box";
import { getRoomById } from "@/api/room";
import RoomEvent from "./room-event";
import RoomPlayers from "./room-players";
import { getEmoji } from "@/api/emoji";

function RoomPage({ id }: { id: string }) {
  const {
    data: roomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoomById(id),
  });

  const { data: gameEmoji } = useQuery({
    queryKey: ["emojis"],
    queryFn: getEmoji,
  });

  if (isLoading && !isError) return null;

  return (
    <div className="border rounded-lg p-2">
      <div className="flex gap-2">
        <div className="w-lg">
          {roomData && !isError && <RoomPlayers room={roomData.data} />}
        </div>
        <div>{roomData && !isError && <ChatBox room={roomData.data} />}</div>
      </div>

      <RoomEvent />
    </div>
  );
}

export default RoomPage;
