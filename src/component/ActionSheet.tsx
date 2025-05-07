import { useState, useEffect, useCallback, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import styles from "./ActionSheet.module.scss";
import Link from "next/link";
import IcCamera from "@/images/icons/ic_camera.svg";
import AutoResizeTextarea from "@/component/AutoResizeTextarea";

interface Props {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onCheckedItemsChange?: (checkedItems: { species: string; size: number }[]) => void;
  onAddFish?: (fish: { species: string; size: number; nickname: string; description: string; imageFile?: File; imageUrl?: string }) => void;
  onUpdateFish?: (fish: FishingTripFish) => void; // ✅ 수정 함수 추가
  fish?: FishingTripFish | null;
}

export default function ActionSheet({ type, isOpen, onClose, onCheckedItemsChange, onAddFish, onUpdateFish, fish }: Props) {

  const fishTypeArry = [
    { species: "배스", imgSrc: "/images/sample/fish_bass.png" },
    { species: "붕어", imgSrc: "/images/sample/fish_boong.png" },
    { species: "잉어", imgSrc: "/images/sample/fish_ing.png" },
    { species: "향어", imgSrc: "/images/sample/fish_hyang.png" },
    { species: "가물치", imgSrc: "/images/sample/fish_gamulchi.png" },
    { species: "블루길", imgSrc: "/images/sample/fish_blue.png" },
    { species: "메기", imgSrc: "/images/sample/fish_megi.png" },
    { species: "숭어", imgSrc: "/images/sample/fish_soong.png" }
  ];

  const [checkedItems, setCheckedItems] = useState<FishingTripFish>({
    species: fishTypeArry[0].species,
    size: 20,
    nickname: "",
    description: "",
    imageFile: undefined,
    imageUrl: ""
  });

  const [viewMode, setViewMode] = useState(type);
  const [previewImage, setPreviewImage] = useState<string>("");
  const detailRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);// 수정 여부 상태

  // 초기 상태값 저장
  const initialCheckedItems: FishingTripFish = {
    species: fishTypeArry[0].species,
    size: 20,
    nickname: "",
    description: "",
    imageFile: undefined,
    imageUrl: ""
  };

  // 모든 입력 초기화 함수
  const resetForm = () => {
    setCheckedItems(initialCheckedItems);
    setPreviewImage("");
  };

  // 초기값 세팅
  const resetFish = () => {
    setCheckedItems(initialCheckedItems);
  }

  // 기존 물고기 수정
  const handleUpdateFishItm = () => {
    if (!checkedItems.species || !checkedItems.size) {
      alert("물고기 종류와 크기를 입력해 주세요.");
      return;
    }
  
    if (!onUpdateFish) {
      console.error("🚨 onUpdateFish is undefined. 데이터 업데이트 불가");
      return;
    }
  
    onUpdateFish(checkedItems); // ✅ 수정된 데이터 업데이트
  
    resetFish();
    resetForm();
    setViewMode("readMode"); // ✅ 읽기 모드로 변경
  };
  
  

  const handleSaveFish = () => {
    if (!checkedItems.species || !checkedItems.size) {
      alert("물고기 종류와 크기를 입력해 주세요.");
      return;
    }
  
    if (isEditing) {
      // ✅ 기존 물고기 수정
      handleUpdateFishItm();
      setIsEditing(false); // ✅ 수정 모드 종료
    } else {
      // ✅ 새로운 물고기 추가
      onAddFish?.(checkedItems);
    }
  
    resetFish();
    resetForm();
    setViewMode("readMode");
    onClose();
  };
  
  
  

  const handleClose = () =>{
    resetForm();
    onClose();
  }


  // 체크박스 변경 핸들러 (하나만 선택 가능)
  // 물고기 종류 변경 시 즉시 반영
  const handleCheckboxChange = (fishName: string) => {

    setCheckedItems((prev) => ({
      ...prev,
      species: fishName,
    }));

    onCheckedItemsChange?.([{ species: fishName, size: checkedItems.size }]);
  };
  
  // 슬라이더 값 변경 핸들러
  const handleSizeChange = (value: number | number[]) => {
    const newSize = Array.isArray(value) ? value[0] : value;
    setCheckedItems((prev) => ({
      ...prev,
      size: newSize,
    }));

    onCheckedItemsChange?.([{ species: checkedItems.species, size: newSize }]);
  };

  // 파일 선택 핸들러
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setCheckedItems(prev => ({
            ...prev,
            imageFile: file, // ✅ 파일 저장
            imageUrl: URL.createObjectURL(file), // ✅ 미리보기 URL 업데이트
        }));

        // ✅ 미리보기 이미지 설정
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    }
  }, []);

  // 액션시트 활성화 중 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (fish) {
      setCheckedItems({
        ...fish,
        imageFile: fish.imageFile || undefined
      });

      // ✅ 기존 물고기라면 서버에서 가져온 이미지 유지
      if (fish.imageUrl) {
        setPreviewImage(fish.imageUrl);
      } else {
        setPreviewImage(""); // ✅ 신규 물고기 추가 시 기존 이미지 초기화
      }
    } else {
      resetFish();
      setPreviewImage(""); // ✅ 신규 추가 시 미리보기 이미지 초기화
    }
  }, [fish]);

  return (
    <>
      {isOpen && (
        <div className={`${styles.action_sheet_wrap} ${isOpen && styles.active}`} onClick={onClose}>
          <div className={styles.action_sheet_min} onClick={(e) => e.stopPropagation()}>
            {viewMode === "list" && (
              <div className={styles.type_list}>
                <ul>
                  <li>
                    <Link href="/community/fishingTrip/write"><p>조행기</p></Link>
                  </li>
                  <li>
                    <Link href="" aria-disabled><p>노하우</p></Link>
                  </li>
                  <li>
                    <Link href="" aria-disabled><p>거래</p></Link>
                  </li>
                  <li>
                    <Link href="" aria-disabled><p>일상</p></Link>
                  </li>
                </ul>
              </div>
            )}
            {viewMode === "writeMode" && (
              <div className={styles.type_radio}>
                <header>
                  <button type="button" className="link_cancel" onClick={handleClose}>취소</button>
                  {/* // 수정중인 경우 */}
                  {isEditing ? (
                    // 수정완료
                    <button type="button" className="btn_save" onClick={handleSaveFish}>수정완료</button>
                  ) : (
                    // 저장
                    <button type="button" className="btn_save" onClick={handleSaveFish}>저장</button>
                  )}
                </header>
                <section>
                  <h2>잡은 물고기</h2>
                  <div className={styles.radio_list_wrap}>
                    <div className={styles.radio_group}>
                      {fishTypeArry.map((fish) => (
                        <div className={styles.radio_item} key={fish.species}>
                          <input
                            type="radio"
                            name="fishSelection"
                            id={fish.species}
                            onChange={() => handleCheckboxChange(fish.species)}
                            checked={checkedItems.species === fish.species}
                          />
                          <label htmlFor={fish.species}>{fish.species}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  

                  {/* 어종 크기 슬라이더 */}
                  <div className="fish_size_slider_wrap">
                    <Image 
                      src={fishTypeArry.find(f => f.species === checkedItems.species)?.imgSrc || ""}
                      alt="fish"
                      width={0}
                      height={200}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      style={{
                        objectFit: "contain",
                        height: "auto",
                        width: `${(checkedItems.size / 70) * 100}%`,
                        transition: "width 0.2s ease",
                      }}
                      priority
                    />
                    <h4>{checkedItems.species} 크기 : {checkedItems.size}cm</h4>
                    <Slider
                      min={10}
                      max={70}
                      step={1}
                      value={checkedItems.size}
                      onChange={handleSizeChange}
                      handleStyle={{
                        width: "34px",
                        height: "34px",
                        backgroundColor: "#00d7f3",
                        border: "5px solid #41e9ff",
                        borderRadius: "50%",
                        marginTop: "-15px",
                      }}
                    />
                  </div>

                  {/* 사진 업로드 */}
                  <div className="picture_wrap">
                    {previewImage && <Image 
                      src={previewImage}
                      alt="Uploaded Preview"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    />}
                    <input type="file" accept="image/*" onChange={handleFileChange} id="pictureUpload" />
                    <label htmlFor="pictureUpload"><IcCamera />사진 선택</label>
                  </div>

                  {/* 별명 입력 */}
                  <div className="nickname_wrap">
                    <div className="input_text_wrap">
                      <input type="text" name="nickname" placeholder="별명 입력" value={checkedItems.nickname} onChange={(e)=>setCheckedItems((prev)=>({...prev, nickname: e.target.value}))}/>
                    </div>
                  </div>

                  {/* 설명 입력 */}
                  <AutoResizeTextarea value={checkedItems.description} onChange={(value) => setCheckedItems((prev) => ({ ...prev, description: value }))} ref={detailRef} />
                </section>
              </div>
            )}

            {viewMode === "readMode" && fish && (
              <div className={styles.type_radio}>
              <header>
                <button type="button" className="link_cancel" onClick={onClose}>닫기</button>
                <button type="button" className="btn_modify" onClick={()=>{
                  setViewMode("writeMode");
                  setIsEditing(true);
                }}>수정</button>
              </header>
              <section>
                {/* ✅ 어종 크기 슬라이더 */}
                <div className="fish_size_slider_wrap">
                    <Image 
                      src={fishTypeArry.find(f => f.species === fish?.species)?.imgSrc || ""}
                      alt="fish"
                      width={0}
                      height={200}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      style={{
                        objectFit: "contain",
                        height: "auto",
                        width: `${(fish.size / 70) * 100}%`,
                        transition: "width 0.2s ease",
                      }}
                      priority
                    />
                    
                    <h4>{fish?.species} 크기 : {fish?.size}cm</h4>
                  </div>

                  {/* 사진 업로드 */}
                  <div className="picture_wrap">
                    {fish.imageUrl ? <Image 
                      src={fish.imageUrl}
                      alt="Uploaded Preview"
                      width={1000}
                      height={1000}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    /> : <p className="noPicture">등록된 사진이 없습니다.</p>}
                  </div>

                  {/* 별명 입력 */}
                  <div className="nickname_wrap read">
                    <span>별명</span>
                      {fish?.nickname ? (
                        <p>{fish?.nickname}</p>
                      ) : (
                        <p className="has_not">등록된 별명이 없습니다.</p>
                      )}
                  </div>

                  {/* 설명 입력 */}
                  <div className="detail_wrap">
                    <span>설명</span>
                    {fish?.description ? (
                        <p>{fish?.description}</p>
                      ) : (
                        <p className="has_not">등록된 설명이 없습니다.</p>
                      )}
                  </div>
              </section>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}