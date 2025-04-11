import { createContext, useContext } from "react";

export const ChatContext = createContext<IChatContext | undefined>(undefined);

interface IChatContext {
  chat: IChat[];
  dispatch: React.Dispatch<ChatAction>; // Add dispatch to the context
  addChat: (chat: IChat) => void;
  //getChats: () => void;
}

interface IChat {
  senderId: string;
  senderUserName: string;
  message: string;
}

// Define action types
type ChatAction =
  | { type: "ADD_CHAT"; payload: IChat }
  | { type: "GET_CHATS"; payload: IChat[] };

export const useChatContext = (): IChatContext => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
