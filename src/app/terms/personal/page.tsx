"use client"

import { useRouter } from 'next/navigation';

import styles from "./../style.module.scss";

import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"

const Personal = () => {

  const router = useRouter();

  return (
    <div className={styles.terms_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>개인정보처리방침</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.terms_min}>
        <h1>개인정보처리방침</h1>
        <p className={styles.date}>최종 수정일: 2025년 3월 16일</p>
        <p className={styles.operator}>운영자: 안계훈</p>

        <section>
          <h2>제1조 (개인정보의 수집 및 이용 목적)</h2>
          <p>본 서비스는 이용자의 개인정보를 다음의 목적을 위해 수집 및 이용합니다.</p>
          <ul>
              <li>회원가입 및 로그인 (카카오 로그인 이용)</li>
              <li>게시물 작성 및 커뮤니티 이용</li>
              <li>이용자 식별 및 서비스 관리</li>
          </ul>
        </section>

        <section>
          <h2>제2조 (수집하는 개인정보 항목)</h2>
          <p>본 서비스는 카카오 로그인을 통해 다음과 같은 정보를 수집합니다.</p>
          <ul>
            <li>닉네임</li>
            <li>이메일</li>
            <li>(선택) 게시물 작성 시 저장되는 위치정보</li>
          </ul>
        </section>

        <section>
          <h2>제3조 (개인정보의 보관 및 파기)</h2>
          <ul>
            <li>이용자가 회원 탈퇴 시 수집된 개인정보는 즉시 삭제됩니다.</li>
            <li>단, 서비스 운영상 필요한 경우 일정 기간 보관될 수 있습니다.</li>
            <li>보관 기간이 만료된 개인정보는 안전한 방법으로 즉시 파기합니다.</li>
          </ul>
        </section>

        <section>
          <h2>제4조 (개인정보 제공 및 공유)</h2>
          <p>운영자는 이용자의 개인정보를 **제3자에게 제공하지 않습니다**.</p>
          <p>단, 다음의 경우에는 예외로 합니다.</p>
          <ul>
            <li>법률에 의해 요구되는 경우</li>
            <li>이용자가 사전에 동의한 경우</li>
          </ul>
        </section>

        <section>
          <h2>제5조 (이용자의 권리 및 개인정보 관리)</h2>
          <ul>
            <li>이용자는 언제든지 자신의 개인정보를 조회, 수정 및 삭제할 수 있습니다.</li>
            <li>회원 탈퇴 시, 저장된 모든 개인정보는 삭제됩니다.</li>
          </ul>
        </section>

        <section>
          <h2>제6조 (보안 및 개인정보 보호 조치)</h2>
          <p>운영자는 이용자의 개인정보를 보호하기 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul>
            <li>개인정보 접근 권한 최소화</li>
            <li>데이터 암호화 및 보안 조치</li>
          </ul>
        </section>

        <section>
          <h2>제7조 (개인정보처리방침 변경 안내)</h2>
          <p>개인정보처리방침은 변경될 수 있으며, 변경 사항은 서비스 내 공지를 통해 안내됩니다.</p>
        </section>

        <section>
          <strong>부칙</strong>
          <p>(시행일) 이 약관은 2025년 3월 16일부터 시행합니다.</p>
        </section>

      </div>
    </div>
  );
};

export default Personal;
