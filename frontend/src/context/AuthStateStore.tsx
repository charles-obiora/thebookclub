import { useReducer, ReactNode, useEffect } from "react";

import { AuthState } from "@/hooks/AuthStateContext";

interface AuthStateType {
  user: { userName: string; email: string } | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { userName: string; email: string }; // Payload is optional for LOGOUT
}

export const AuthReducer = (
  state: AuthStateType,
  action: AuthAction
): AuthStateType => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload || null };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

//called AuthStateStore instead of AuthContextStore for easy understanding
export const AuthStateStore = ({ children }: { children: ReactNode }) => {
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
    <AuthState.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthState.Provider>
  );
};
