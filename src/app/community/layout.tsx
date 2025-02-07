"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./layout.module.scss"

import FooterNav from "@/component/FooterNav";
import Header from "@/component/Header";
import NavCommunity from "@/component/navigation/NavCommunity";
import IcListWrite from "@/images/icons/ic_list_write.svg";
import ActionSheet from "@/component/ActionSheet";

export default function CommmunityLayout({children}:{children: React.ReactNode}){

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  // 하위 특정 경로내 페이지는 본 레이아웃 적용 금지
  const pathname = usePathname();

  useEffect(() => {
    setIsActionSheetOpen(false);
  }, [pathname]); // ✅ pathname이 변경될 때마다 실행됨

  if (pathname.startsWith("/community/write") || pathname.startsWith("/community/read")) {
    return <>{children}</>;
  }

  return(
    <div className={styles.sub_menupage_wrap}>
      <Header />
      <NavCommunity />
      <div className={styles.container}>
        {children}
        <button type="button" className={styles.btn_write} onClick={()=>{setIsActionSheetOpen(true)}}><IcListWrite/>글쓰기</button>
      </div>
      <FooterNav />
      <ActionSheet type="list" isOpen={isActionSheetOpen} onClose={()=> setIsActionSheetOpen(false)} />      
    </div>
  )
}