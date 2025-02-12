"use client"

import { useState } from "react";

import Image from 'next/image'
import Link from "next/link"
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import styles from "./page.module.scss"
import FishList from '@/component/FishList';
import ActionSheet from '@/component/ActionSheet';

export default function Read() {

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  return (
    <div className={styles.layout_read_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="/community/fishingTrip" className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>조행기 게시판</h2></div>        
        <div className={styles.right}>
          {/* <button type="button" className="btn_save">등록</button> */}
        </div>
      </header>
      <div className={styles.contents_wrap}>
        <div className={styles.contents_min}>
          <h3>드디어 잡았습니다.</h3>
          <div className={styles.write_info_wrap}>
            <div className={styles.user_picture}>
              <Image
                src="/images/sample/user_picture.png"
                alt="썸네일"
                width={200}
                height={150}
                style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                priority
              />
            </div>
            <div className={styles.write_info_min}>
              <div className={styles.user_info}>
                <span className={styles.user_name}>회원명</span>
                <span className={styles.user_level}>완벽한 배서</span>
              </div>
              <div className={styles.write_info}>
                <p className={styles.time}>24.09.03</p>
                <p className={styles.view}>13</p>
                <p className={styles.like}>2</p>
              </div>
            </div>
          </div>
          <div className={styles.image_wrap}>
            <Image
              src="/images/sample/user_picture.png"
              alt="썸네일"
              width={200}
              height={150}
              style={{ objectFit: "contain", width: '100%', height: 'auto' }}
              priority
            />
          </div>
          <div className={styles.location_wrap}>
            <div className={styles.location_min}>
              <p>예당저수지 낚시회관 8번 좌대</p>
            </div>
          </div>
          <div className={styles.detail_wrap}>
            <div className={styles.detail_min}>
              <p>잘 다녀왔습니다. 모두들 배스 많이 잡으세요 화이팅입니다!</p>
            </div>
          </div>
          <div className={styles.fish_list_wrap}>
            <FishList type="read" fishDetailOpen={()=>setIsActionSheetOpen(true)}/>
          </div>
        </div>
      </div>
      <ActionSheet 
        type="readFish" 
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
      />
    </div>
  );
}
