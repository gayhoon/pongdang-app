"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import IcSnsKakao from "@/images/icons/ic_sns_kakao.svg";
import IcSnsNaver from "@/images/icons/ic_sns_naver.svg";
import IcSnsApple from "@/images/icons/ic_sns_apple.svg";
import IcSnsGoogle from "@/images/icons/ic_sns_google.svg";
import IcHeaderHome from "@/images/icons/ic_header_home.svg";

import styles from "./page.module.scss";
const Login = () => {
  const router = useRouter();

  // 로그인 시도
  const handleLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  return (
    <div className={styles.login_wrap}>
      <header>
        <button
          type="button"
          onClick={() => router.push("/community/fishingTrip")}
        >
          <IcHeaderHome />
        </button>
      </header>
      <div className={styles.login_min}>
        <div className={styles.introduce}>
          <h2>낚시인 필수 커뮤니티 앱</h2>
          <h1>
            <Image src="/images/logo.svg" alt="logo" width={196} height={36} />
          </h1>
          <Image
            src="/images/login_img.png"
            alt="낚시로그인이미지"
            width={227}
            height={150}
            priority
          />
        </div>
        <div className={styles.select_sns}>
          <div className={styles.title}>
            <hr />
            <p>SNS 계정으로 로그인</p>
            <hr />
          </div>
          <ul>
            <li>
              <button
                type="button"
                className={styles.kakao}
                onClick={handleLogin}
              >
                <IcSnsKakao />
              </button>
            </li>
            <li>
              <button type="button" className={styles.naver} disabled>
                <IcSnsNaver />
              </button>
            </li>
            <li>
              <button type="button" className={styles.apple} disabled>
                <IcSnsApple />
              </button>
            </li>
            <li>
              <button type="button" className={styles.google} disabled>
                <IcSnsGoogle />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
