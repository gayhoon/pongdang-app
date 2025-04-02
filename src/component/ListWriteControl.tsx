"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import IcListWrite from "@/images/icons/ic_list_write.svg";
import ActionSheet from "@/component/ActionSheet";

import styles from "./ListWriteControl.module.scss";

export default function ListWriteControl() {

  const { user, loading } = useAuth();
  const router = useRouter();

  // 하위 특정 경로내 페이지는 본 레이아웃 적용 금지
  const pathname = usePathname();

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  
  // 로그인된 상태라면 actionSheet를 보여주고, 아니라면 로그인화면으로 이동
  const checkLogin = () => {
    if(user){
      setIsActionSheetOpen(true);
    }else{
      router.push("/account/login");
    }
  }

  useEffect(() => {
    setIsActionSheetOpen(false);
  }, [pathname]); // ✅ pathname이 변경될 때마다 실행됨
  
  return (
    <>
      <button type="button" className={styles.btn_write} onClick={checkLogin}><IcListWrite/>글쓰기</button>
      <ActionSheet type="list" isOpen={isActionSheetOpen} onClose={() => setIsActionSheetOpen(false)} />
    </>
  );
}
