"use client";

import { LogOut, Send } from "lucide-react";
import ChatBubble from "../common/chat-bubble";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useEffect, useRef, useState } from "react";
import { Room } from "../../../../packages/shared/src";
import { useMutation, useQuery } from "@tanstack/react-query";
import { leaveRoom } from "@/api/room";
import { toast } from "sonner";
import { getCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import useRoom from "@/hooks/useRoom";
import { queryClient } from "@/app/providers";
import { sendMessage } from "@/api/chat";
import useChat from "@/hooks/useChat";

type ChatBoxType = {
  room: Room;
};

function ChatBox({ room }: ChatBoxType) {
  const { chatData, isLoading } = useChat(room._id);

  const { roomEve } = useRoom();
  const router = useRouter();
  const msgRef = useRef<HTMLDivElement>(null);
  const player = getCookie("player");
  const playerId = player ? JSON.parse(player)._id : "";
  const [input, setInput] = useState<string>("");

  const leaveRoomMutation = useMutation({
    mutationKey: ["leaveRoom"],
    mutationFn: leaveRoom,
  });

  const sendMessageMutation = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
  });

  useEffect(() => {
    if (input === "" && msgRef.current) {
      msgRef.current.scrollTo({
        top: msgRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatData, input]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["room", room._id],
    });
  }, [roomEve]);

  function submitHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessageMutation.mutateAsync(
      {
        text: input,
        rid: room._id,
        userid: playerId,
      },
      {
        onSuccess: () => {
          setInput("");
        },
        onError: () => toast.error("Error sending message"),
      }
    );
  }

  const leaveRoomHandle = () => {
    if (confirm("Are you sure you want to leave the room?")) {
      leaveRoomMutation.mutate(
        { rid: room._id, userid: playerId },
        {
          onSuccess: () => {
            router.push("/play");
          },
          onError: (error) => {
            toast.error("Error leaving room");
          },
        }
      );
    }
  };

  return (
    <div className="rounded-sm border p-2 w-md h-[80dvh]">
      <div className="sticky top-0 h-[30px] flex justify-between items-center pb-[10px]">
        <strong>
          {room.name}{" "}
          <small>({room.players.filter((el) => el.online).length})</small>
        </strong>
        <span className="text-xs">1 / 10</span>
        <Button variant="ghost" className="p-0" onClick={leaveRoomHandle}>
          <LogOut />
        </Button>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div
          className="max-h-full overflow-y-auto h-[calc(100%-80px)] no-scrollbar"
          ref={msgRef}
        >
          <div className="flex flex-col py-4 justify-end gap-4">
            {chatData && chatData.data ? (
              chatData.data.map((chat) => (
                <ChatBubble key={chat._id} {...chat} />
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center h-[200px] flex items-center justify-center">
                Not Started
              </p>
            )}
          </div>
        </div>
      )}
      <div className="sticky bottom-0 h-[50px]">
        <form className="flex gap-2 py-2" onSubmit={submitHandle}>
          <Input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            disabled={!input || sendMessageMutation.isPending}
          >
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
