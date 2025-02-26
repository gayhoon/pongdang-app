"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Image from 'next/image'
import Link from "next/link"
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import styles from "./page.module.scss"
import FishList from '@/component/FishList';
import ActionSheet from '@/component/ActionSheet';

type FishingTrip = 
  { 
    id: number, 
    cate: string, 
    title: string, 
    nickname: string, 
    date: string, 
    view: number, 
    fish: number, 
    images: string[], 
    reply: number,
    location: string,
    detail: string
  };

export default function Read() {

  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams(); // ✅ URL에서 ID 가져오기
  const [post, setPost] = useState<FishingTrip | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  // ✅ 특정 게시글 데이터 가져오기
  useEffect(() => {
    if (!id) return;
    setLoading(true); //API 요청 시작 전 로딩 상태 true
    fetch(`http://localhost:8090/api/v1/fishingTrip/${id}`)
      .then((res) => {
        if(!res.ok){
          throw new Error(`게시글을 찾을 수 없습니다. (HTTP ${res.status})`);
        }
        return res.json()}
      )
      .then((data) => setPost(data))
      .catch((error) => console.error("게시글 불러오기 실패:", error))
      .finally(()=> setLoading(false)); // 요청 완료 후 로딩 상태 해제
  }, [id]);

  // 로딩 중일 때
  if(loading){
    return <>게시글을 불러오는 중 ...</>
  }

  // 데이터가 들어오지 않았을 때
  if(!post){
    return <>게시글을 찾을 수 없습니다.</>
  }

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
          <h3>{post.title}</h3>
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
              src={post.images[0]}
              alt="썸네일"
              width={200}
              height={150}
              style={{ objectFit: "contain", width: '100%', height: 'auto' }}
              priority
            />
          </div>
          <div className={styles.location_wrap}>
            <div className={styles.location_min}>
              <p>{post.location}</p>
            </div>
          </div>
          <div className={styles.detail_wrap}>
            <div className={styles.detail_min}>
              <p>{post.detail}</p>
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
