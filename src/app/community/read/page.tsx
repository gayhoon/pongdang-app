import Image from 'next/image'

import styles from "./page.module.scss"

export default function Read() {

  return (
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
      </div>
    </div>
  );
}
