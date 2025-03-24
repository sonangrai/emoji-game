"use client";

import { Send } from "lucide-react";
import ChatBubble from "../common/chat-bubble";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useEffect, useRef, useState } from "react";

function ChatBox() {
  const msgRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Do you liked the game?",
      time: "12:00",
      isSender: false,
      user: {
        name: "John Doe",
        image: "https://randomuser.me/api/portraits",
      },
    },
    {
      id: 2,
      message: "Hey, I am loving this game so much 😄",
      time: "12:08",
      isSender: true,
      user: {
        name: "Sonang Sencho",
        image: "https://randomuser.me/api/portraits",
      },
    },
  ]);

  useEffect(() => {
    if (input === "" && msgRef.current) {
      msgRef.current.scrollTo({
        top: msgRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, input]);

  function submitHandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: input,
        time: new Date().toLocaleTimeString(),
        isSender: true,
        user: {
          name: "Sonang Sencho",
          image: "https://randomuser.me/api/portraits",
        },
      },
    ]);
    setInput("");
  }

  return (
    <div className="rounded-sm border p-2 w-md h-[80dvh]">
      <div className="sticky top-0 h-[30px] flex justify-between items-center pb-[10px]">
        <strong>Jhola Gang</strong>
        <span className="text-xs">1 / 10</span>
      </div>
      <div
        className="max-h-full overflow-y-auto h-[calc(100%-80px)] no-scrollbar"
        ref={msgRef}
      >
        <div className="flex flex-col py-4 justify-end gap-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} {...message} />
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 h-[50px]">
        <form className="flex gap-2 py-2" onSubmit={submitHandle}>
          <Input
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={!input}>
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
