"use client"

import { useRouter } from 'next/navigation';

import styles from "./../style.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"

const Use = () => {

  const router = useRouter();

  return (
    <div className={styles.terms_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>이용약관</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.terms_min}>
        <h1>이용약관</h1>
        <p className={styles.date}>최종 수정일: 2025년 3월 16일</p>
        <p className={styles.operator}>운영자: 안계훈</p>

        <section>
            <h2>제1조 (목적)</h2>
            <p>본 약관은 퐁당(이하 "서비스")의 이용과 관련하여 운영자와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section>
            <h2>제2조 (정의)</h2>
            <ul>
                <li><strong>"운영자"</strong>란 본 서비스를 제공하고 관리하는 개인을 의미합니다.</li>
                <li><strong>"이용자"</strong>란 본 서비스에 접속하여 서비스를 이용하는 모든 회원 및 비회원 사용자를 의미합니다.</li>
                <li><strong>"게시물"</strong>이란 이용자가 본 서비스에 업로드하는 텍스트, 사진, 위치정보 등을 포함한 모든 콘텐츠를 의미합니다.</li>
            </ul>
        </section>

        <section>
            <h2>제3조 (서비스 개요 및 운영자 정보)</h2>
            <p>본 서비스는 낚시 조행기를 공유하는 커뮤니티 앱으로, 이용자는 게시물을 작성하고 열람할 수 있습니다.</p>
            <p>본 서비스는 <strong>비영리적인 개인 운영 서비스</strong>이며, 별도의 사업자등록이 되어 있지 않습니다.</p>
            <p>본 서비스는 유료 결제 기능이 없으며, 모든 서비스는 무료로 제공됩니다.</p>
        </section>

        <section>
            <h2>제4조 (회원가입 및 로그인)</h2>
            <p>본 서비스는 <strong>카카오 로그인을 통해 회원가입</strong>이 이루어지며, 이용자의 닉네임 및 이메일 정보를 저장합니다.</p>
            <p>회원가입 시 수집되는 정보는 <strong>서비스 운영 목적 이외에는 사용되지 않습니다</strong>.</p>
        </section>

        <section>
            <h2>제5조 (위치정보 활용 및 동의)</h2>
            <p>이용자가 게시물을 작성할 때 <strong>위치정보를 함께 저장할 수 있으며</strong>, 이는 게시물에 표시될 수 있습니다.</p>
            <p>운영자는 위치정보를 다른 목적으로 사용하거나, 제3자에게 제공하지 않습니다.</p>
        </section>

        <section>
            <h2>제6조 (게시물 관리 및 권리)</h2>
            <p>이용자가 작성한 게시물의 저작권은 해당 이용자에게 있습니다.</p>
            <p>운영자는 다음과 같은 경우 게시물을 사전 통지 없이 삭제하거나 수정할 수 있습니다:</p>
            <ul>
                <li>타인을 비방하거나 명예를 훼손하는 경우</li>
                <li>저작권을 침해하는 경우</li>
                <li>광고, 홍보, 스팸성 게시물인 경우</li>
            </ul>
        </section>

        <section>
            <h2>제7조 (서비스 이용 제한 및 탈퇴)</h2>
            <p>이용자가 불법 콘텐츠를 게시하거나 서비스 운영을 방해하는 경우, 운영자는 해당 계정을 정지하거나 이용을 제한할 수 있습니다.</p>
        </section>

        <section>
            <h2>제8조 (운영자의 책임 제한)</h2>
            <p>본 서비스는 <strong>개인이 운영하는 비영리 서비스</strong>로, 서비스의 연속성 및 안정성을 보장하지 않습니다.</p>
        </section>

        <section>
            <h2>제9조 (이용약관의 변경 및 공지)</h2>
            <p>본 약관은 운영자의 필요에 따라 변경될 수 있으며, 변경 사항은 서비스 내 공지를 통해 사전 안내합니다.</p>
        </section>

        <section>
          <strong>부칙</strong>
          <p>(시행일) 이 약관은 2025년 3월 16일부터 시행합니다.</p>
        </section>
        
      </div>
    </div>
  );
};

export default Use;
