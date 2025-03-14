"use client"

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
    email: string;
    nickname: string;
  };
  
  type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };

// ✅ 로그인 상태 Context 생성
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Context Provider 생성
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("사용자 정보 요청 실패:", error);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// ✅ 로그인 상태를 사용하는 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  const logout = async () => {
    await fetch("http://localhost:8090/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user"); // ✅ localStorage 삭제
    context.setUser(null);
  };

  return { ...context, logout };
};