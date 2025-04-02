import FooterNav from "@/component/FooterNav";
import Header from "@/component/Header";
import NavCommunity from "@/component/navigation/NavCommunity";

import Image from 'next/image'
import Link from 'next/link';

import styles from "./page.module.scss";
import ListWriteButton from "@/component/ListWriteControl";

export default async function FishingTrip() {

  // 게시글 목록 조회 요청
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip`, {
    cache: "no-store"  // 항상 최신 데이터 가져오기
  });

  // 서버로부터 전달받은 게시글 목록
  const posts: FishingTrip[] = await res.json();

  // 날짜형식 yyyy-mm-dd -> yy.mm.dd 변경
  const formatDate = (dateString: string): string => {
    if (!dateString) return "날짜 없음"; // ✅ 예외 처리 추가
    const [year, month, day] = dateString.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  };
  
  return (
    <div className={styles.sub_menupage_wrap}>
      <Header type="submain" />
      <NavCommunity />
      <div className={styles.container}>
        <div className={styles.fishing_trip_wrap}>
          <ul className={styles.fishing_trip_list_wrap}>
            {posts && posts.length > 0 ? (
              posts.map((data) => (
                <li key={data.id}>
                  <Link href={`/community/fishingTrip/${data.id}`}>
                    <div className={styles.inside_wrap}>
                      <div className={styles.info_wrap}>
                        <div className={styles.top}>
                          <div className={`${styles.cate} ${styles.daily}`}>{data.cate}</div>
                          <p>{data.title}</p>
                        </div>
                        <div className={styles.down}>
                          <p className={styles.name}>{data.authorNickname || "익명"}</p>
                          <p className={styles.time}>{formatDate(data.date)}</p>
                          <p className={styles.view}>{data.viewCount ?? 0}</p>
                          <p className={styles.fish}>{data.fishes?.length ?? 0}</p>
                        </div>
                      </div>
                      {data.images && data.images.length > 0 && (
                        <div className={styles.thumb}>
                          <Image
                            src={data.images[0]}
                            alt="썸네일"
                            width={200}
                            height={150}
                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            priority
                          />
                        </div>
                      )}
                      <div className={styles.reply}>
                        <p className={styles.num}>{data.comments?.length ?? 0}</p>
                        <p className={styles.static}>댓글</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className={styles.no_data}>게시글이 없습니다.</p>
            )}
          </ul>
        </div>
        <ListWriteButton />
      </div>
      <FooterNav />
    </div>
  );
};
