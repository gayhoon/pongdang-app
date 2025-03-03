import SvgLogo from '@/images/logo.svg';
import SvgMenuNameCommunity from '@/images/menuname_community.svg';
import styles from './Header.module.scss'
import KakaoLogin from './KakaoLogin';

export default function Header() {

  return (
    <header className={styles.submenupage_header}>
        <div className={styles.title}>
            <SvgLogo className={styles.logo} />
            <hr />
            <SvgMenuNameCommunity className={styles.menu_name} />
            <KakaoLogin/>
        </div>
    </header>
  );
}
