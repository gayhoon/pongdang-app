import SvgIcMenuCmtAll from '@/images/icons/ic_menu_cmt_all.svg'
import SvgIcMenuCmtFishingtrip from '@/images/icons/ic_menu_cmt_fishingtrip.svg'
import SvgIcMenuCmtKnowhow from '@/images/icons/ic_menu_cmt_knowhow.svg'
import SvgIcMenuCmtTrans from '@/images/icons/ic_menu_cmt_trans.svg'
import SvgIcMenuCmtDaily from '@/images/icons/ic_menu_cmt_daily.svg'

import styles from "./NavCommunity.module.scss"

export default function NavCommunity() {

  return (
    <div className={styles.depth_menu_wrap}>
        <ul>
            <li className={styles.yet}><SvgIcMenuCmtAll className={styles.home} /><p>전체</p></li>
            <li><SvgIcMenuCmtFishingtrip className={styles.fishing_trip} /><p>조행기</p></li>
            <li className={styles.yet}><SvgIcMenuCmtKnowhow className={styles.fishing_trip} /><p>노하우</p></li>
            <li className={styles.yet}><SvgIcMenuCmtTrans className={styles.fishing_trip} /><p>거래</p></li>
            <li className={styles.yet}><SvgIcMenuCmtDaily className={styles.fishing_trip} /><p>일상</p></li>
        </ul>
    </div>
  );
}
