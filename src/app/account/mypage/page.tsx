"use client"

import { useRouter } from 'next/navigation';

import styles from "./page.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"
import { useEffect, useState } from 'react';


const Mypage = () => {
  const [nickname, setNickname] = useState(null);

  const router = useRouter();

  // 로그아웃 시도
  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      localStorage.removeItem("kakao_access_token"); // 로컬 스토리지에서 토큰 삭제
      // 새로고침
      router.push("/community/fishingTrip")
    }
  }

  // 사용자정보 가져오기 시도
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("kakao_access_token");

    // 사용자 토큰 정보 없는 경우(로그인정보 없을 시)
    if(!token){
      return
    }

    try{
      const response = await fetch("https://kapi.kakao.com/v2/user/me",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      const userData = await response.json();
      setNickname(userData.properties.nickname);
    } catch(error){
      console.log("사용자 정보 가져오기 실패", error)
    }
  }

  useEffect(()=>{
    fetchUserInfo();
  }, [])

  return (
    <div className={styles.mypage_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="/community/fishingTrip" className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>마이페이지</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.mypage_min}>
        <p>{nickname}님 안녕하세요</p>
        <button type="button" onClick={handleLogout}>로그아웃</button>
        <hr />
        <p>본 페이지 컨텐츠는 아래와 같이 구성되어야 함</p>
        <ul>
          <li>닉네임(수정가능)</li>
          <li>프로필사진(수정가능)</li>
          <li>내가 쓴 글</li>
          <li>댓글 단 글</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>로그아웃</li>
          <li>회원탈퇴</li>
        </ul>
      </div>
    </div>
  );
};

export default Mypage;
