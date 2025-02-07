import Image from 'next/image'
import Link from 'next/link';

import styles from "./page.module.scss";

export default function FishingTrip() {
  return (
    <div className={styles.fishing_trip_wrap}>
      <ul className={styles.fishing_trip_list_wrap}>
        {Array.from({length:15},(_, index)=>(
          <li key={index}>
          <Link href={"/community/read"}>
            <div className={styles.inside_wrap}>
              <div className={styles.info_wrap}>
                <div className={styles.top}>
                  <div className={`${styles.cate} ${styles.daily}`}>일상</div>
                  <p>드디어 잡았습니다.</p>
                </div>
                <div className={styles.down}>
                  <p className={styles.name}>배스조사이올시다</p>
                  <p className={styles.time}>24.09.03</p>
                  <p className={styles.view}>13</p>
                  <p className={styles.like}>2</p>
                </div>
              </div>
              <div className={styles.thumb}>
                <Image
                  src="/images/sample/thumb_sample.jpg"
                  alt="썸네일"
                  width={200}
                  height={150}
                  style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                  priority
                />
              </div>
              <div className={styles.reply}>
                <p className={styles.num}>32</p>
                <p className={styles.static}>댓글</p>
              </div>
            </div>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};