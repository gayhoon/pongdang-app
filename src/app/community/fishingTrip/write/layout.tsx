import Link from "next/link"
import styles from "./layout.module.scss"

export default function WriteLayout({children}:{children: React.ReactNode}){

  return(
    <div className={styles.layout_write_wrap}>
      <header className={styles.layout_write_wrap_header}>
        <div className={styles.left}>
          <Link href="/community/fishingTrip" className="link_cancel">취소</Link>
        </div>
        <div className={styles.right}>
          {/* <button type="button">임시저장</button> */}
          <button type="button" className="btn_save">등록</button>
        </div>
      </header>
      {children}
    </div>
  )
}