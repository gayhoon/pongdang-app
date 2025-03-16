"use client"

import { useRouter } from 'next/navigation';

import styles from "./../style.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"

const Location = () => {

  const router = useRouter();

  return (
    <div className={styles.terms_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>위치기반서비스 이용약관</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.terms_min}>
        <h1>위치기반서비스 이용약관</h1>
        <p className={styles.date}>최종 수정일: 2025년 3월 16일</p>
        <p className={styles.operator}>운영자: 안계훈</p>

        <section>
          <h2>제1조 (목적)</h2>
          <p>본 약관은 퐁당(이하 "서비스")에서 제공하는 위치기반서비스의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section>
          <h2>제2조 (위치기반서비스의 제공)</h2>
          <p>본 서비스는 이용자의 동의를 받은 후, 다음과 같은 기능을 제공합니다.</p>
          <ul>
            <li>게시물 작성 시 이용자의 위치를 저장 및 표시</li>
            <li>위치 기반의 게시물 검색 기능 제공</li>
          </ul>
        </section>

        <section>
          <h2>제3조 (위치정보의 수집 및 이용)</h2>
          <p>운영자는 이용자가 동의한 경우에 한해, 다음과 같은 방식으로 위치정보를 수집하고 이용합니다.</p>
          <ul>
            <li>이용자가 게시글을 작성할 때 위치정보를 선택적으로 저장</li>
            <li>저장된 위치정보는 해당 게시물과 함께 서비스 내에서 표시됨</li>
          </ul>
        </section>

        <section>
          <h2>제4조 (위치정보의 보관 및 삭제)</h2>
          <ul>
            <li>이용자가 삭제 요청을 하는 경우, 해당 위치정보는 즉시 삭제됩니다.</li>
            <li>회원 탈퇴 시, 이용자의 모든 위치정보는 자동으로 삭제됩니다.</li>
          </ul>
        </section>

        <section>
          <h2>제5조 (위치정보의 제공 및 공유)</h2>
          <p>운영자는 이용자의 위치정보를 **제3자에게 제공하지 않습니다**.</p>
          <p>단, 다음의 경우에는 예외로 합니다.</p>
          <ul>
            <li>법령에 따라 제공이 요구되는 경우</li>
            <li>이용자가 사전에 동의한 경우</li>
          </ul>
        </section>

        <section>
          <h2>제6조 (이용자의 권리 및 선택)</h2>
          <ul>
            <li>이용자는 단말기 설정을 통해 언제든지 위치정보 제공을 거부할 수 있습니다.</li>
            <li>위치정보 제공 거부 시, 일부 서비스 이용이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2>제7조 (위치기반서비스의 변경 및 종료)</h2>
          <p>운영자는 서비스 운영상의 필요에 따라 위치기반서비스를 변경하거나 종료할 수 있으며, 변경 사항은 사전 공지를 통해 안내합니다.</p>
        </section>

        <section>
          <strong>부칙</strong>
          <p>(시행일) 이 약관은 2025년 3월 16일부터 시행합니다.</p>
        </section>

      </div>
    </div>
  );
};

export default Location;
