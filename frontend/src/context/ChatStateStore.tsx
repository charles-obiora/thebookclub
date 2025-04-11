// src/context/ChatContext.tsx

import React, { useReducer, ReactNode } from "react";

import { ChatContext } from "@/hooks/useChatContext";

// Define your TypeScript interface for chat
export interface IChat {
  senderId: string;
  senderUserName: string;
  message: string;
}

// Define action types
type ChatAction =
  | { type: "ADD_CHAT"; payload: IChat }
  | { type: "GET_CHATS"; payload: IChat[] };

// Define the initial state
const initialState: IChat[] = [];

// Reducer function to handle the actions
const chatReducer = (state: IChat[], action: ChatAction): IChat[] => {
  switch (action.type) {
    case "ADD_CHAT":
      return [...state, action.payload];
    case "GET_CHATS":
      return action.payload;
    default:
      return state;
  }
};

// Create the provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chat, dispatch] = useReducer(chatReducer, initialState);

  console.log(chat);

  // Function to add a new chat
  const addChat = (newChat: IChat) => {
    dispatch({ type: "ADD_CHAT", payload: newChat });
  };

  return (
    <ChatContext.Provider value={{ chat, dispatch, addChat }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the Chat context
