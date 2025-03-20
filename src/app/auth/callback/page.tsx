"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const KakaoCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code"); // 카카오에서 받은 인증 코드
  const { fetchUser } = useAuth();

  useEffect(() => {
    if (code) {
      // fetchAccessToken(code);
      sendCodeToBackend(code);
    }
  }, [code]);

  const sendCodeToBackend = async (code: string) => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/kakao`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
         },
        credentials: "include", // HTTP-only 쿠키 사용
        body: JSON.stringify({ code }),
      });

      if(response.ok){
        await fetchUser(); // 로그인 성공 후 사용자 정보 즉시 갱신
        router.push("/community/fishingTrip"); // 로그인 성공 후 페이지 이동
      }else{
        console.error("로그인 실패");
      }
    }catch(error){
      console.error("로그인 요청 실패:", error);
    }
  }

  return <p>로그인 처리 중...</p>;
};

export default KakaoCallback;
