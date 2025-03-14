"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from "@/context/AuthContext"

import styles from "./page.module.scss";

import Image from 'next/image'
import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"
import IcCamera from "@/images/icons/ic_camera.svg"


const Mypage = () => {
  const { user, logout } = useAuth();

  const router = useRouter();

  // 로그아웃 시도
  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      logout();
      router.push("/community/fishingTrip")
    }
  }

  useEffect(()=>{
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
        <section>
          <h2>내 정보</h2>
          <div className={styles.myinfo_wrap}>
            <div className={styles.thumb_wrap}>
              <div className={styles.thumb_min}>
                <Image
                  src="/images/img_profile_picture.png"
                  alt="프로필사진"
                  width={200}
                  height={150}
                  style={{ objectFit: "cover", width: '100%', height: '100%' }}
                  priority
                />
              </div>
              <button type="button"><IcCamera /></button>
            </div>
            <div className={styles.nickname_wrap}>
              <div className={styles.nickname_min}>
                <p>{user?.nickname}</p>
                <button type="button">편집</button>
              </div>
            </div>
          </div>
        </section>
        <p>{user?.nickname}님 안녕하세요</p>
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
