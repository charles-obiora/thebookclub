import { createContext, Dispatch, useContext } from "react";

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { userName: string; email: string };
}

interface AuthStateType {
  user: { userName: string; email: string } | null;
  dispatch: Dispatch<AuthAction>;
}

export const AuthState = createContext<AuthStateType | undefined>(undefined);

export const useAuthState = () => {
  const context = useContext(AuthState);

  if (!context) {
    throw new Error(
      "useAuthState must be used within a component that is wrapped by AuthStateProvider"
    );
  }

  return context;
};
