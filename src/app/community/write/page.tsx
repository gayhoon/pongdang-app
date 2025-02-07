"use client"

import { useState } from "react";
import Image from 'next/image'

import styles from "./page.module.scss"
import AutoResizeTextarea from "@/component/AutoResizeTextarea";
import ActionSheet from "@/component/ActionSheet";
import MultiImageUpload from "@/component/MultiImageUpload";

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
          <div className="fish_list_wrap">
            <h2>잡은 물고기</h2>
            <ul>
              <li>
                <button type="button" className="fish">
                  <div className="thumb_wrap">
                    <span className="cate">배스</span>
                    <div className="thumb_min">
                      <Image
                        src="/images/sample/fish_sample.png"
                        alt="fish"
                        width={100}
                        height={150}
                        style={{ objectFit: "contain", height: 'auto' }}
                        priority
                      />
                    </div>
                  </div>
                  <div className="text">
                    <span>34cm</span>
                    <p>배식이</p>
                  </div>
                </button>
              </li>
              <li>
                <button type="button" className="fish">
                  <div className="thumb_wrap">
                    <span className="cate">배스</span>
                    <div className="thumb_min">
                      <Image
                        src="/images/sample/fish_sample.png"
                        alt="fish"
                        width={100}
                        height={150}
                        style={{ objectFit: "contain", height: 'auto' }}
                        priority
                      />
                    </div>
                  </div>
                  <div className="text">
                    <span>34cm</span>
                    <p>배식이</p>
                  </div>
                </button>
              </li>
              <li>
                <button type="button" className="fish">
                  <div className="thumb_wrap">
                    <span className="cate">배스</span>
                    <div className="thumb_min">
                      <Image
                        src="/images/sample/fish_sample.png"
                        alt="fish"
                        width={100}
                        height={150}
                        style={{ objectFit: "contain", height: 'auto' }}
                        priority
                      />
                    </div>
                  </div>
                  <div className="text">
                    <span>34cm</span>
                    <p>배식이</p>
                  </div>
                </button>
              </li>
              <li>
                <button type="button" className="add" onClick={() => setIsActionSheetOpen(true)}>추가</button>
              </li>
            </ul>
          </div>
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
