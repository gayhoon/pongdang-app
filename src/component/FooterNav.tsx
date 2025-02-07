import SvgIcFooterHome from '@/images/icons/ic_footer_home.svg'
import SvgIcFooterCommunity from '@/images/icons/ic_footer_community.svg'
import styles from "./FooterNav.module.scss"

import Link from 'next/link';

export default function FooterNav() {

  return (
    <footer className={styles.nav}>
      <ul>
        <li>
          <Link href={''}>
            <SvgIcFooterHome/>
            <p>홈</p>
          </Link>
        </li>
        <li className={styles.active}>
          <Link href={''}>
            <SvgIcFooterCommunity/>
            <p>커뮤니티</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
