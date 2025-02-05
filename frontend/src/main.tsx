import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextStore } from "@/context/AuthContextStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextStore>
      <App />
    </AuthContextStore>
  </StrictMode>
);
