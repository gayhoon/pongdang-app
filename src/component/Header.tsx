import { useRouter } from 'next/navigation';

import SvgLogo from '@/images/logo.svg';
import SvgMenuNameCommunity from '@/images/menuname_community.svg';
import styles from './Header.module.scss'
import IcBtnUser from "@/images/icons/ic_btn_user.svg"

interface Props{
  type: string;
  children?: React.ReactNode;
}

export default function Header({type, children}:Props) {

  const router = useRouter();

  const handleLoginCheckRouter = () =>{
    if(localStorage.getItem("kakao_access_token")){
      router.push("/account/mypage")
    }else{
      router.push("/account/login")
    }
  }

  return (
    <header className={styles.submenupage_header}>
      {type === "submain" ? (
        <>
          <div className={styles.title}>
            <SvgLogo className={styles.logo} />
            <hr />
            <SvgMenuNameCommunity className={styles.menu_name} />
          </div>
          <div className={styles.header_btn_wrap}>
            <button type="button" onClick={handleLoginCheckRouter}><IcBtnUser/></button>
          </div>
        </>
      ):(
        <>
          {children}
        </>
      )}
    </header>
  );
}
