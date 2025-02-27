"use client"

import { useState, useCallback, useRef } from "react";
import Link from "next/link"

import styles from "./page.module.scss"
import AutoResizeTextarea from "@/component/AutoResizeTextarea";
import ActionSheet from "@/component/ActionSheet";
import MultiImageUpload from "@/component/MultiImageUpload";
import FishList from "@/component/FishList";

export default function Write() {

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [checkedFishCateGroup, setCheckedFishCateGroup] = useState<{ name: string; size: number }[]>([]);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement | null>(null);

  // write
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState("조행기");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const [fishes, setFishes] = useState<{ species: string; size: number; nickname: string; description: string }[]>([]);
  const [images, setImages] = useState<File[]>([]); // 업로드할 이미지 파일들

  const handleImageChange = useCallback((files: File[]) => {
    setImages(files);
  }, [])

  // 물고기 추가 핸들러
  const handleAddFish = (fish: { species: string; size: number; nickname: string; description: string }) => {
    setFishes((prevFishes) => [...prevFishes, fish]);
  }


  // ✅ 게시글 저장 요청
  const handleSubmit = async () => {
    if (!title ) {
      alert("제목을 입력해주세요.");
      titleRef.current?.focus();
      return;
    }

    if (!location ) {
      alert("장소를 입력해주세요.");
      locationRef.current?.focus();
      return;
    }

    if (!detail ) {
      alert("내용을 입력해주세요.");
      detailRef.current?.focus();
      return;
    }
  
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify({
      cate,
      title,
      location,
      detail,
      fishes
    })], { type: "application/json" })); // ✅ JSON을 Blob으로 변환 후 FormData에 추가
  
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    try {
      const response = await fetch("http://localhost:8090/api/v1/fishingTrip", {
        method: "POST",
        body: formData, // ✅ FormData 사용
        // ❌ headers를 설정하면 multipart가 깨지므로 제거!
      });
  
      if (response.ok) {
        alert("게시글이 등록되었습니다.");
        window.location.href = "/community/fishingTrip";
      } else {
        throw new Error("등록 실패");
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };


  // ActionSheet 컴포넌트에서 체크된 어종들을 업데이트하는 함수
  const handleCheckedItems = (checkedItems: { name: string; size: number }[]) => {
    // 비동기 처리용
    setTimeout(()=>{
      setCheckedFishCateGroup(checkedItems)
    }, 0)
  }
  return (
    <div className={styles.layout_write_wrap}>
      <header className={styles.layout_write_wrap_header}>
        <div className={styles.left}>
          <Link href="/community/fishingTrip" className="link_cancel">취소</Link>
        </div>
        <div className={styles.right}>
          {/* <button type="button">임시저장</button> */}
          <button type="button" className="btn_save" onClick={handleSubmit}>등록</button>
        </div>
      </header>
      <div className={styles.contents_wrap}>
        <h2>조행기 게시판</h2>
        <ul>
          <li>
            <div className="input_text_wrap">
            <input type="text" placeholder="제목 입력" value={title} onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
            </div>
          </li>
          <li>
            <div className="input_text_wrap">
              <input type="text" placeholder="장소 입력" value={location} onChange={(e) => setLocation(e.target.value)} ref={locationRef} />
            </div>
          </li>
          <li>
            <div className="input_text_wrap">
              {/* <textarea name="" id="" placeholder="내용을 입력해주세요"></textarea> */}
              <AutoResizeTextarea value={detail} onChange={setDetail} ref={detailRef} />
            </div>
          </li>
          <li>
            <MultiImageUpload onChange={handleImageChange}/>
          </li> 
          <li>
            <FishList onOpen={() => (setIsActionSheetOpen(true))} fishDetailOpen={()=>setIsActionSheetOpen(true)} fishes={fishes}/>
          </li>
        </ul>
        <ActionSheet
          type="check"
          isOpen={isActionSheetOpen}
          onClose={() => setIsActionSheetOpen(false)}
          onCheckedItemsChange={handleCheckedItems}
          onAddFish={handleAddFish}
        />
      </div>
    </div>
    
  );
}
