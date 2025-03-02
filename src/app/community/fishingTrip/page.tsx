"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import FooterNav from "@/component/FooterNav";
import Header from "@/component/Header";
import NavCommunity from "@/component/navigation/NavCommunity";
import IcListWrite from "@/images/icons/ic_list_write.svg";
import ActionSheet from "@/component/ActionSheet";

import Image from 'next/image'
import Link from 'next/link';

import styles from "./page.module.scss";

export default function FishingTrip() {

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  
  const [posts, setPosts] = useState<FishingTrip[]>([]);

  // 하위 특정 경로내 페이지는 본 레이아웃 적용 금지
  const pathname = usePathname();

  // ✅ 백엔드 API에서 게시글 목록 가져오기
  useEffect(() => {
    fetch("http://localhost:8090/api/v1/fishingTrip")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);

  useEffect(() => {
    setIsActionSheetOpen(false);
  }, [pathname]); // ✅ pathname이 변경될 때마다 실행됨

  return (
    <div className={styles.sub_menupage_wrap}>
      <Header />
      <NavCommunity />
      <div className={styles.container}>
        <div className={styles.fishing_trip_wrap}>
          <ul className={styles.fishing_trip_list_wrap}>
            {posts.map((data)=>(
              <li key={data.id}>
                {/* <Link href={data.thumb}> */}
                <Link href={`/community/fishingTrip/${data.id}`}>
                  <div className={styles.inside_wrap}>
                    <div className={styles.info_wrap}>
                      <div className={styles.top}>
                        {/* <div className={`${styles.cate} ${styles.daily}`}>{data.cate}</div> */}
                        <div className={`${styles.cate} ${styles.daily}`}>{data.cate}</div>
                        <p>{data.title}</p>
                      </div>
                      <div className={styles.down}>
                        <p className={styles.name}>타고난배서</p>
                        <p className={styles.time}>{data.date}</p>
                        <p className={styles.view}>{data.viewCount}</p>
                        <p className={styles.fish}>배스</p>
                      </div>
                    </div>
                    {data.images && data.images.length > 0 &&(
                      <div className={styles.thumb}>
                        <Image
                          src={data.images[0]}
                          alt="썸네일"
                          width={200}
                          height={150}
                          style={{ objectFit: "cover", width: '100%', height: '100%' }}
                          priority
                        />
                      </div>
                    )}
                    <div className={styles.reply}>
                      <p className={styles.num}>113</p>
                      <p className={styles.static}>댓글</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className={styles.btn_write} onClick={()=>{setIsActionSheetOpen(true)}}><IcListWrite/>글쓰기</button>
      </div>
      <FooterNav />
      <ActionSheet type="list" isOpen={isActionSheetOpen} onClose={()=> setIsActionSheetOpen(false)} />      
    </div>
  );
};