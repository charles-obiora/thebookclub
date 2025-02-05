import { useReducer, ReactNode, useEffect } from "react";

import { authContext } from "@/hooks/authContext";

interface AuthState {
  user: { userName: string; email: string } | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { userName: string; email: string }; // Payload is optional for LOGOUT
}

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload || null };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextStore = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  console.log(`Current state: ${state}`);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log(`Stored user: ${storedUser}`);

    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
