"use client"

import { useState } from "react";


import styles from "./page.module.scss"
import AutoResizeTextarea from "@/component/AutoResizeTextarea";
import ActionSheet from "@/component/ActionSheet";
import MultiImageUpload from "@/component/MultiImageUpload";
import FishList from "@/component/FishList";

export default function Write() {

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [checkedFishCateGroup, setCheckedFishCateGroup] = useState<{ name: string; size: number }[]>([]);

  // ActionSheet 컴포넌트에서 체크된 어종들을 업데이트하는 함수
  const handleCheckedItems = (checkedItems: { name: string; size: number }[]) => {
    // 비동기 처리용
    setTimeout(()=>{
      setCheckedFishCateGroup(checkedItems)
    }, 0)
  }
  return (
    <div className={styles.contents_wrap}>
      <h2>조행기 게시판</h2>
      <ul>
        <li>
          <div className="input_text_wrap">
            <input type="text" name="" id="" placeholder="제목 입력" />
          </div>
        </li>
        <li>
          <div className="input_text_wrap">
            <input type="text" name="" id="" placeholder="장소 입력" />
          </div>
        </li>
        <li>
          <div className="input_text_wrap">
            {/* <textarea name="" id="" placeholder="내용을 입력해주세요"></textarea> */}
            <AutoResizeTextarea/>
          </div>
        </li>
        <li>
          <MultiImageUpload />
        </li> 
        <li>
          <FishList onOpen={() => setIsActionSheetOpen(true)} fishDetailOpen={()=>setIsActionSheetOpen(true)}/>
        </li>
      </ul>
      <ActionSheet
        type="check"
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        onCheckedItemsChange={handleCheckedItems}
      />
    </div>
  );
}
