"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

import styles from "./page.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"

const Identification = () => {

  const router = useRouter();

  const { logout, deleteUser } = useAuth();

  // 로그아웃 시도
  const handleLogout = () => {
    if(confirm("로그아웃 하시겠습니까?")){
      logout();
      router.push("/community/fishingTrip")
    }
  }

  return (
    <div className={styles.identification_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>계정 관리</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.identification_min}>
        <ul>
          <li><button type="button" onClick={handleLogout}>로그아웃</button></li>
          <li><button type="button" onClick={deleteUser}>회원탈퇴</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Identification;
