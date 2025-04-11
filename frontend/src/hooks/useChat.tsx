// socket.ts (WebSocket Setup)
import { useEffect } from "react";
import { IChat } from "@/types/types";
import { socket } from "@/hooks/socket";
import { useChatContext } from "./useChatContext";

export const useChat = () => {
  //const [previousChats, setPreviousChats] = useState<IChat[]>([]);
  //const [newChat, setNewChat] = useState<IChat | null>(null);

  const context = useChatContext();

  console.log(context, "the context");

  const { dispatch } = context;

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
      dispatch({ type: "GET_CHATS", payload: storedChats });
      //setPreviousChats(storedChats);
    });

    return () => {
      socket.disconnect(); // Clean up when component unmounts
    };
  }, []);

  socket.on("newChat", (newChat: IChat) => {
    dispatch({ type: "ADD_CHAT", payload: newChat });
  });

  const sendChatFunction = (senderUserName: string, message: string) => {
    socket.emit("sentChat", {
      senderUserName,
      message,
    });
  };

  return {
    //previousChats,
    //newChat,
    sendChatFunction,
  };
};

{
  /*export const sendChat = () => {
  const senderUserName = JSON.parse(localStorage.getItem("user")!).userName;
  const chat = document.getElementById("chat")!.value;
};*/
}
