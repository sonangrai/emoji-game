import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "../lib/socket";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("SocketProvider is missing");
  return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
