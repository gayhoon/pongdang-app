"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from "@/context/AuthContext";

import styles from "./page.module.scss";

import Image from 'next/image'
import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"
import IcCamera from "@/images/icons/ic_camera.svg"
import IcSetting from "@/images/icons/ic_setting.svg"

const Mypage = () => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(()=>{
  }, [])

  return (
    <div className={styles.mypage_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
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
        <section>
          <h2>내가 쓴 글</h2>
          <p className={styles.notice}>현재 준비중입니다. 빠른 시일내에 서비스 제공하도록 하겠습니다!</p>
        </section>
        <section>
          <h2>내가 쓴 댓글</h2>
          <p className={styles.notice}>현재 준비중입니다. 빠른 시일내에 서비스 제공하도록 하겠습니다!</p>
        </section>
        <section>
          <h2>관리</h2>
          <ul>
            <li>
              <button type="button" onClick={()=>router.push("/account/mypage/settings")}>
                <div className={styles.icon_min}><IcSetting /></div>
                <p>설정</p>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Mypage;
