"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const KakaoCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code"); // 카카오에서 받은 인증 코드

  useEffect(() => {
    if (code) {
      fetchAccessToken(code);
    }
  }, [code]);

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
          code: code,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("kakao_access_token", data.access_token); // 로컬 스토리지에 저장
        router.push("/community/fishingTrip"); // 메인 페이지로 이동 (또는 원하는 페이지로 이동)
      }
    } catch (error) {  
      console.error(error);
    }
  };

  return <p>로그인 처리 중...</p>;
};

export default KakaoCallback;
