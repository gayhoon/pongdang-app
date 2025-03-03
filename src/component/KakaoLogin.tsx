import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const KakaoLogin = () => {

  const [nickname, setNickname] = useState<String | null>(null);

  const router = useRouter();

  // 로그인 시도
  const handleLogin = () => {
    const KAKAO_REST_API_KEY = '950a753d3092508b28b42ad997e4f987';
    const REDIRECT_URI = 'http://localhost:3000/api/auth/kakao/callback';
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  // 로그아웃 시도
  const handleLogout = () =>{
    localStorage.removeItem("nickname"); // 닉네임 정보 삭제
    setNickname(null);
    router.replace("/community/fishingTrip"); // 로그인 페이지로 향후 이동처리 필요
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        // console.error("인가 코드가 없습니다.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8090/api/auth/kakao/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();
        if (data.nickname) {
          setNickname(data.nickname);
          localStorage.setItem("nickname", data.nickname); // ✅ 닉네임 저장
          router.replace("/community/fishingTrip"); // ✅ 로그인 완료 후 이동
        } else {
          console.error("로그인 실패:", data);
          router.replace("/login"); // 로그인 실패 시 다시 로그인 페이지로 이동
        }
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
        router.replace("/login"); // 에러 발생 시 로그인 페이지로 이동
      } finally {
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  return (
    <>
      {nickname ? (
        <>
          <p>{nickname}</p>
          <button type="button" onClick={handleLogout}>로그아웃</button>
        </>
      ):(
        <button onClick={handleLogin} style={{ background: '#fee500', border: 'none', padding: '10px', cursor: 'pointer' }}>
          카카오 로그인
        </button>
      )}
      
    </>
  );
};

export default KakaoLogin;
