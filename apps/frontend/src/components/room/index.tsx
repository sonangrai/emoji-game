"use client";
import { useQuery } from "@tanstack/react-query";
import ChatBox from "./chat-box";
import { getRoomById } from "@/api/room";
import RoomEvent from "./room-event";

function RoomPage({ id }: { id: string }) {
  const { data: roomData, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoomById(id),
  });

  if (isLoading) return null;

  return (
    <div className="border rounded-lg p-2">
      <div className="flex gap-2">
        <div className="w-lg">Emoji Here</div>
        <div>
          <ChatBox room={roomData.data} />
        </div>
      </div>

      <RoomEvent />
    </div>
  );
}

export default RoomPage;
