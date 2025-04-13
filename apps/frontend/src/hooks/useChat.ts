import { getChats } from "@/api/chat";
import { useSocket } from "@/context/socketContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export type ChatType = {
  id: string;
  message: string;
  time: string;
  isSender: boolean;
  system: boolean;
  user: {
    name: string;
  };
};

function useChat(id: string) {
  const {
    data: chatData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChats(id),
  });

  const socket = useSocket();

  useEffect(() => {
    socket.on("CHAT:UPDATED", () => {
      refetch();
    });
  }, []);

  return {
    chatData,
    isLoading,
  };
}

export default useChat;
