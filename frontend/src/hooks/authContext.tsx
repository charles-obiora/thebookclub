import { createContext, Dispatch, useContext } from "react";

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { userName: string; email: string };
}

interface AuthContextType {
  user: { userName: string; email: string } | null;
  dispatch: Dispatch<AuthAction>;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};
