import Link from "next/link"
import styles from "./layout.module.scss"

import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"

export default function ReadLayout({children}:{children: React.ReactNode}){

  return(
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
      {children}
    </div>
  )
}