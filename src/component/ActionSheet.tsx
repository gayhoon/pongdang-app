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
  onCheckedItemsChange?: (checkedItems: { name: string; size: number }[]) => void;
  onAddFish?: (fish: {species: string; size: number; nickname: string; description: string}) => void;
}

export default function ActionSheet({ type, isOpen, onClose, onCheckedItemsChange, onAddFish }: Props) {

  const fishTypeArry = [
    { name: "배스", imgSrc: "/images/sample/fish_bass.png" },
    { name: "붕어", imgSrc: "/images/sample/fish_boong.png" },
    { name: "잉어", imgSrc: "/images/sample/fish_ing.png" },
    { name: "향어", imgSrc: "/images/sample/fish_hyang.png" },
    { name: "가물치", imgSrc: "/images/sample/fish_gamulchi.png" },
    { name: "블루길", imgSrc: "/images/sample/fish_blue.png" },
    { name: "메기", imgSrc: "/images/sample/fish_megi.png" },
    { name: "숭어", imgSrc: "/images/sample/fish_soong.png" }
  ];

  const [checkedItems, setCheckedItems] = useState<{ name: string; size: number; nickname: string; description: string }>({
    name: fishTypeArry[0].name, // 기본값: 첫 번째 물고기 (배스)
    size: 20,
    nickname: "",
    description: "",
  });
  
  const [image, setImage] = useState<string>("");
  const [detail, setDetail] = useState("");
  const detailRef = useRef<HTMLTextAreaElement | null>(null);

  // ✅ 초기 상태값 저장
  const initialCheckedItems = {
    name: fishTypeArry[0].name, // 첫 번째 물고기 기본값
    size: 20,
    nickname: "",
    description: "",
  };

  // ✅ 모든 입력 초기화 함수
  const resetForm = () => {
    setCheckedItems(initialCheckedItems);
    setImage("");
    setDetail("");
  };

  // ✅ 물고기 추가
  const handleAddFishItm = () => {
    if (!checkedItems.name || !checkedItems.size) {
      alert("물고기 종류와 크기를 입력해 주세요.");
      return;
    }

    // ✅ 부모 컴포넌트로 전달
    onAddFish?.({
      species: checkedItems.name,
      size: checkedItems.size,
      nickname: checkedItems.nickname,
      description: checkedItems.description,
    });

    // 입력 필드 초기화
    setCheckedItems({
      name: fishTypeArry[0].name,
      size: 20,
      nickname: "",
      description: "",
    });

    resetForm();
    onClose();
  };

  const handleClose = () =>{
    resetForm();
    onClose();
  }


  // ✅ 체크박스 변경 핸들러 (하나만 선택 가능)
  // ✅ 물고기 종류 변경 시 즉시 반영
  const handleCheckboxChange = (fishName: string) => {

    setCheckedItems((prev) => ({
      ...prev,
      name: fishName,
    }));

    onCheckedItemsChange?.([{ name: fishName, size: checkedItems.size }]);
  };
  
  // ✅ 슬라이더 값 변경 핸들러
  const handleSizeChange = (value: number | number[]) => {
    const newSize = Array.isArray(value) ? value[0] : value;
    setCheckedItems((prev) => ({
      ...prev,
      size: newSize,
    }));

    onCheckedItemsChange?.([{ name: checkedItems.name, size: newSize }]);
  };

  // ✅ 파일 선택 핸들러
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  // ✅ 액션시트 활성화 중 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={`${styles.action_sheet_wrap} ${isOpen && styles.active}`} onClick={onClose}>
          <div className={styles.action_sheet_min} onClick={(e) => e.stopPropagation()}>
            {type === "list" && (
              <div className={styles.type_list}>
                <ul>
                  <li>
                    <Link href="/community/fishingTrip/write"><p>조행기</p></Link>
                  </li>
                  <li>
                    <Link href=""><p>노하우</p></Link>
                  </li>
                  <li>
                    <Link href=""><p>거래</p></Link>
                  </li>
                  <li>
                    <Link href=""><p>일상</p></Link>
                  </li>
                </ul>
              </div>
            )}
            {type === "check" && (
              <div className={styles.type_radio}>
                <header>
                  <button type="button" className="link_cancel" onClick={handleClose}>취소</button>
                  <button type="button" className="btn_save" onClick={handleAddFishItm}>등록</button>
                </header>
                <section>
                  <h2>잡은 물고기</h2>
                  <div className={styles.radio_list_wrap}>
                    <div className={styles.radio_group}>
                      {fishTypeArry.map((fish) => (
                        <div className={styles.radio_item} key={fish.name}>
                          <input
                            type="radio"
                            name="fishSelection"
                            id={fish.name}
                            onChange={() => handleCheckboxChange(fish.name)}
                            checked={checkedItems.name === fish.name}
                          />
                          <label htmlFor={fish.name}>{fish.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ✅ 어종 크기 슬라이더 */}
                  <div className="fish_size_slider_wrap">
                    <Image 
                      src={fishTypeArry.find(f => f.name === checkedItems.name)?.imgSrc || ""}
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
                    
                    <h4>{checkedItems.name} 크기 : {checkedItems.size}cm</h4>
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
                    {image && <Image 
                      src={image}
                      alt="Uploaded Preview"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    />}
                    <label htmlFor="pictureUpload"><IcCamera />사진 선택</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} id="pictureUpload" />
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

            {type === "readFish" && (
              <div className={styles.type_radio}>
              <header>
                <button type="button" className="link_cancel" onClick={onClose}>닫기</button>
              </header>
              <section>
                {/* ✅ 어종 크기 슬라이더 */}
                <div className="fish_size_slider_wrap">
                    <Image 
                      src={fishTypeArry.find(f => f.name === checkedItems.name)?.imgSrc || ""}
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
                    
                    <h4>{checkedItems.name} 크기 : {checkedItems.size}cm</h4>
                  </div>

                  {/* 사진 업로드 */}
                  <div className="picture_wrap">
                    {image ? <Image 
                      src={image}
                      alt="Uploaded Preview"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    /> : <p className="noPicture">등록된 사진이 없습니다.</p>}
                  </div>

                  {/* 별명 입력 */}
                  <div className="nickname_wrap read">
                    <span>별명</span>
                    <p>배식이</p>
                  </div>

                  {/* 설명 입력 */}
                  <div className="detail_wrap">
                    <span>설명</span>
                    <p>프리리그로 잡았음</p>
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
