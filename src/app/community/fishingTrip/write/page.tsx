"use client"

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"

import styles from "./page.module.scss"
import AutoResizeTextarea from "@/component/AutoResizeTextarea";
import ActionSheet from "@/component/ActionSheet";
import MultiImageUpload from "@/component/MultiImageUpload";
import FishList from "@/component/FishList";

export default function Write() {

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [checkedFishCateGroup, setCheckedFishCateGroup] = useState<{ species: string; size: number }[]>([]);
  const [selectedFish, setSelectedFish] = useState<FishingTripFish | null>(null)
  
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement | null>(null);

  // 게시글 상세 화면에서 전달받은 useParam("id")을 useSearchParams에서 받아 사용하여 게시글 조회
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // write
  const [title, setTitle] = useState("");
  const [cate, setCate] = useState("조행기");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const [fishes, setFishes] = useState<{ species: string; size: number; nickname: string; description: string, imageFile?: File, imageUrl?: string }[]>([]);
  const [images, setImages] = useState<File[]>([]); // 신규 게시글로 추가할 이미지 파일들
  const [existingImages, setExistingImages] = useState<string[]>([]); // 게시글 수정을 위해 서버에서 받아온 이미지 URL
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // 백엔드에서 기존 이미지를 유지할지 삭제할지 알 수 있도록 deletedImages를 추가하여 전송

  // 이미지 변경
  const handleImageChange = useCallback((files: File[]) => {
    setImages((prev) => [...prev, ...files]); // ✅ 새 이미지 추가
  }, []);

  // 이미지 삭제
  const handleDeleteImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setDeletedImages((prev) => [...prev, existingImages[index]]); // 삭제된 이미지 저장
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };
  

  // 물고기 추가 핸들러
  const handleAddFish = (fish: FishingTripFish) => {
    setFishes((prevFishes) => [...prevFishes, fish]); // ✅ 기존 배열에 추가
  };
  
  const handleUpdateFish = (updatedFish: FishingTripFish) => {
    setFishes((prevFishes) => {
      // ✅ 기존 배열에서 변경할 물고기의 index 찾기
      const index = prevFishes.findIndex(fish => fish.nickname === selectedFish?.nickname);
      if (index === -1) return prevFishes; // 기존 물고기가 없으면 그대로 반환
  
      // ✅ 해당 index의 물고기 정보 업데이트
      const updatedFishes = [...prevFishes];
      updatedFishes[index] = updatedFish;
  
      return updatedFishes;
    });
  };
  
  // 게시글 저장 요청
  const handleSubmit = async () => {
    if (!title) {
      alert("제목을 입력해주세요.");
      titleRef.current?.focus();
      return;
    }
    if (!detail) {
      alert("내용을 입력해주세요.");
      detailRef.current?.focus();
      return;
    }
  
    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            id, // ✅ ID 포함하여 전송 (수정 요청일 경우)
            cate,
            title,
            location,
            detail,
            fishes: fishes.map(({ imageFile, ...rest }) => rest), // imageFile 제거 후 데이터 전송
            existingImages, // 유지할 기존 이미지 목록
            deletedImages
          }),
        ],
        { type: "application/json" }
      )
    );
  
    // ✅ 물고기 이미지 추가
    fishes.forEach((fish, index) => {
      if (fish.imageFile) {
        formData.append(`fishImages_${index}`, fish.imageFile);
      }
    });
  
    // ✅ 게시글 메인 이미지 추가
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    try {
      const response = await fetch(
        "http://localhost:8090/api/v1/fishingTrip",
        {
          method: "POST", // ✅ `PUT` 대신 `POST` 사용 (백엔드가 `POST`만 처리 가능할 경우)
          body: formData,
        }
      );
  
      if (response.ok) {
        alert(id ? "게시글이 수정되었습니다." : "게시글이 등록되었습니다.");
        window.location.href = "/community/fishingTrip";
      } else {
        throw new Error("등록 실패");
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };
  
  
  

  // 상세화면에서 useParam으로 받아온 id가 있다면 로드 시 한 번만 실행
  useEffect(()=>{
    if(!id){return} // id가 없다면 실행 안함
    
    fetch(`http://localhost:8090/api/v1/fishingTrip/${id}`)
      .then((res) => res.json())
      .then((data)=>{
        console.log("불러온 게시글 데이터:", data);
        setTitle(data.title);
        setCate(data.cate);
        setLocation(data.location);
        setDetail(data.detail);
        setFishes(data.fishes || []);
        setExistingImages(data.images || []) // 서버에서 받아온 이미지 설정
      })
      .catch((error)=>console.error("게시글 불러오기 실패:", error));
  },[id]);

  // ActionSheet 컴포넌트에서 체크된 어종들을 업데이트하는 함수
  const handleCheckedItems = (checkedItems: { species: string; size: number }[]) => {
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
            <MultiImageUpload 
              onChange={handleImageChange} 
              existingImages={existingImages} // ✅ 기존 이미지 전달
              onDeleteImage={handleDeleteImage} // ✅ 이미지 삭제 핸들러
            />
          </li> 
          <li>
            <FishList 
              onOpen={() => {
                setSelectedFish(null); // 신규 물고기 추가 시 초기화
                setIsActionSheetOpen(true);
              }}
              fishDetailOpen={(fish) => {
                console.log("🐟 선택된 물고기:", fish);
                setSelectedFish(fish); // 기존 물고기 선택 시 해당 데이터 유지
                setIsActionSheetOpen(true);
              }}
              fishes={fishes}
              onUpdateFish={(updatedFish:any) => {
                setFishes((prevFishes) =>
                  prevFishes.map((fish) =>
                    fish.nickname === updatedFish.nickname ? updatedFish : fish
                  )
                );
              }}
            />
          </li>
        </ul>
        {isActionSheetOpen && (
          <ActionSheet
            type={selectedFish ? "readMode" : "writeMode"}
            isOpen={isActionSheetOpen}
            onClose={() => setIsActionSheetOpen(false)}
            onCheckedItemsChange={handleCheckedItems}
            onAddFish={handleAddFish} // ✅ 추가 시 호출
            onUpdateFish={handleUpdateFish} // ✅ 수정 시 호출
            fish={selectedFish}
          />
        )}
       
      </div>
    </div>
    
  );
}
