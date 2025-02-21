// socket.ts (WebSocket Setup)
import { useEffect, useState } from "react";
import { IChat } from "@/types/types";
import { socket } from "@/hooks/socket";

export const useChat = () => {
  const [previousChats, setPreviousChats] = useState<IChat[]>([]);
  const [newChat, setNewChat] = useState<IChat | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on("con", () => {
      console.log("Connected to server");
    });

    // Receive past chats from server
    socket.on("storedChats", (storedChats: IChat[]) => {
      setPreviousChats(storedChats);
    });

    {
      /*socket.emit("sentChat", {
      senderId,
      senderUserName,
      chat,
    });*/
    }

    return () => {
      socket.disconnect(); // Clean up when component unmounts
    };
  }, []);

  socket.on("newChat", (chat: IChat) => {
    setNewChat(chat);
  });

  return {
    previousChats,
    newChat,
  };
};
