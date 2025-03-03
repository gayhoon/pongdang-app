import { useState, useRef, useEffect } from "react";
import styles from "./OverflowMenu.module.scss";
import IcBtnOverflowMore from "@/images/icons/ic_btn_overflow_more.svg"

interface ChildProps {
    children: React.ReactNode; // 부모가 채울 영역을 children으로 받음
}

export default function OverflowMenu({children}: ChildProps) {

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null); // ✅ 메뉴 컨테이너 참조

  const handleOverflowOpen = () =>{
    // if(isOpen){setIsOpen(false)}else{setIsOpen(true)} 와 같음. 아래는 간결하게 작성한 버전
    setIsOpen(prev => !prev)
  }

  // isOpen이 변경될 때 실행
  useEffect(()=>{
    if(isOpen){
      // 마우스 클클릭 이벤트 발생 시 실행(e는 사용자가 클릭한 마우스 이벤트 객체임)
      const handleClickOutside = (e:MouseEvent) =>{
        // ref를 이용해 메뉴div의 dom을 참조
        // .contains(e.target): 클릭된 요소가 menuRef.current의 자식 요소인지 확인합니다.
        // e.target: 사용자가 클릭한 실제 HTML 요소.
        // 따라서, 사용자가 클릭한 요소가 menuRef로 설정한 요소의 부모가 아니라면 setIsOpen을 false로 변경
        if(menuRef.current && !menuRef.current.contains(e.target as Node)){
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isOpen])

  return (
    <div className={styles.overflow_menu_wrap}>
      <button type="button" className={styles.btn_overflow} onClick={handleOverflowOpen}><IcBtnOverflowMore/></button>
      { isOpen && (
        <div className={styles.overflow_menu_min} ref={menuRef}>
          {children}
        </div>
      )}
    </div>
  );
}
