"use client"

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
    email: string;
    nickname: string;
  };
  
  type AuthContextType = {
    user: User | null;
    jwtToken: string | null; // JWT 상태 관리
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUser: () => Promise<void>; // 로그인 후 즉시 호출 가능하도록 fetchUser 추가
    setJwtToken: React.Dispatch<React.SetStateAction<string | null>>; // ✅ 추가
    deleteUser: () => Promise<void>; // 회원탈퇴 함수 추가
  };

// 로그인 상태 Context 생성
const AuthContext = createContext<AuthContextType | null>(null);

// Context Provider 생성
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null); // JWT 상태 추가

  // ✅ 쿠키에서 JWT 가져오는 함수 추가
  const getTokenFromCookie = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))?.split("=")[1];

    if (cookieValue) {
      setJwtToken(cookieValue);
    } else {
      console.warn("🚨 JWT 쿠키 없음!");
    }
  };

  // ✅ 서버에서 사용자 정보 가져오기
  const fetchUser = async () => {
    console.log("📌 현재 document.cookie 값:", document.cookie); // ✅ 디버깅용 로그 추가
    try {
      // const token = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("jwt="))
      //   ?.split("=")[1];

      // if (!token) {
      //   console.warn("🚨 JWT 쿠키 없음!");
      //   return;
      // }
      
      const response = await fetch("http://localhost:8090/api/v1/user/me", {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` }, // ✅ JWT 추가
        credentials: "include", // JWT 쿠키 포함
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        // ✅ Authorization 헤더에서 JWT 가져오기
        const token = response.headers.get("Authorization")?.replace("Bearer ", "");

        if (token) {
          setJwtToken(token);
          console.log("📌 가져온 JWT:", token);
        } else {
          console.warn("🚨 JWT 토큰이 응답 헤더에 없음!");
        }

        getTokenFromCookie(); // ✅ JWT 가져와서 상태에 저장
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error);
      setUser(null);
    }
  };

  const deleteUser = async () => {
    try{
      const response = await fetch("http://localhost:8090/api/v1/user/me", {
        method: "DELETE",
        credentials: "include", // JWT 쿠키 포함
      })

      if(response.ok){
        
        if(confirm("회원탈퇴 시 작성했던 게시글은 모두 삭제됩니다. 정말 탈퇴하시겠습니까?")){
          setUser(null);
          setJwtToken(null); // ✅ jwtToken 삭제
          alert("회원탈퇴가 완료되었습니다.");
          window.location.href="/" // 홈으로 이동
        }else{
          return
        }       
        
      }else{
        alert("회원탈퇴 실패");
      }
    }catch(error){
      console.error("회원탈퇴 요청 실패:", error);
      alert("오류 발생. 관리자에게 문의해주세요");
    }
  };

  useEffect(() => {
    fetchUser(); // 로그인 상태 초기화
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, jwtToken, setJwtToken, fetchUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 로그인 상태를 사용하는 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  // 로그인 된 상태에서 로그아웃 실행
  const logout = async () => {
    await fetch("http://localhost:8090/api/v1/auth/logout", {
      method: "POST",
      credentials: "include", // 로그인 시 백엔드 서버로부터 발급받은 JWT가 포함된 쿠키를 자동 전송
    });

    context.setUser(null);
    context.setJwtToken(null); // ✅ 로그아웃 시 jwtToken도 삭제
  };

  return { ...context, logout };
};