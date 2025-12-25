import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { UserProps } from "../types/authData";
import Swal from "sweetalert2";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProps | null;
}

interface AuthContextValue {
  state: AuthState;
  login: (token: string, user: UserProps) => void;
  logout: () => void;
}


const getSafeUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser || storedUser === "undefined") return null;
  try {
    return JSON.parse(storedUser);
  } catch (e) {
    return null;
  }
};

const storedToken = localStorage.getItem("token");
const safeUser = getSafeUser();

const initialState: AuthState = {
  isAuthenticated: !!storedToken && !!safeUser,
  token: storedToken,
  user: safeUser,
};

type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: UserProps } }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
  
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

 
  const login = (token: string, user: UserProps) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { token, user } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    
    Swal.fire({
      icon: 'success',
      title: 'התנתקת בהצלחה!',
      showConfirmButton: false,
      timer: 1500,
      background: '#1a1a1a', 
      color: '#ffffff',
      iconColor: '#d4af37'
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}