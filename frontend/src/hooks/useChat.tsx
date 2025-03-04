// socket.ts (WebSocket Setup)
import { useEffect, useState } from "react";
import { IChat } from "@/types/types";
import { socket } from "@/hooks/socket";

export const useChat = () => {
  const [previousChats, setPreviousChats] = useState<IChat[]>([]);
  const [newChat, setNewChat] = useState<IChat | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is undefined in local storage");
      }

      socket.auth = { token: JSON.parse(token) }; // ✅ Set token dynamically
      socket.connect(); // ✅ Now connect with auth

      socket.on("con", (response) => {
        console.log(response);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    // Receive past chats from server
    socket.on("storedChats", (storedChats: IChat[]) => {
      setPreviousChats(storedChats);
    });

    {
      /*socket.emit("sentChat", {
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

{
  /*export const sendChat = () => {
  const senderUserName = JSON.parse(localStorage.getItem("user")!).userName;
  const chat = document.getElementById("chat")!.value;
};*/
}
