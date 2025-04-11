import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//instead of AuthContextStore like they call it in most tutorials, I call authStateStore. I can replace the word context with state anywhere I can
import { AuthStateStore } from "@/context/AuthStateStore.tsx";
import { ChatProvider } from "@/context/ChatStateStore.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthStateStore>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthStateStore>
  </StrictMode>
);
