"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

import styles from "./page.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"
import IcBtnLinkPage from "@/images/icons/ic_btn_link_page.svg"

const Settings = () => {

  const router = useRouter();

  const { logout } = useAuth();

  // 로그아웃 시도
  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      logout();
      router.push("/community/fishingTrip")
    }
  }

  return (
    <div className={styles.settings_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>마이페이지</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.settings_min}>
        <section>
          <ul>
          <li>
              <Link href="/terms/use"><span>이용약관</span><IcBtnLinkPage /></Link>
            </li>
            <li>
              <Link href="/terms/location"><span>위치기반서비스 이용약관</span><IcBtnLinkPage /></Link>
            </li>
            <li>
              <Link href="/terms/personal"><span>개인정보처리방침</span><IcBtnLinkPage /></Link>
            </li>
            <li>
              <Link href="/account/mypage/settings/identification"><span>계정관리</span><IcBtnLinkPage /></Link>
            </li>
          </ul>
          <hr />
        </section>
        {/* <section>
          <h2>고객센터</h2>
          <ul>
            <li>
              <Link href=""><span>공지사항</span><IcBtnLinkPage /></Link>
            </li>
            <li>
              <Link href=""><span>FAQ</span><IcBtnLinkPage /></Link>
            </li>
          </ul>
          <hr />
        </section> */}
        <section>
          <h2>고객의 소리</h2>
          <div className={styles.customer_info}>
            <ul>
              <li>
                <span>010-2632-9174</span>
              </li>
              <li>
                <span>gayhoon@naver.com</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
