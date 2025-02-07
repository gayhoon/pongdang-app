import { useState, useEffect, useCallback } from "react";
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
}

export default function ActionSheet({ type, isOpen, onClose, onCheckedItemsChange }: Props) {
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

  const [checkedItems, setCheckedItems] = useState<{ name: string; size: number }[]>([
    { name: fishTypeArry[0].name, size: 20 }
  ]);
  const [image, setImage] = useState<string | null>(null);

  // ✅ 체크박스 변경 핸들러 (하나만 선택 가능)
  const handleCheckboxChange = (fishName: string) => {
    setCheckedItems([{ name: fishName, size: checkedItems[0]?.size ?? 20 }]);
    onCheckedItemsChange?.([{ name: fishName, size: checkedItems[0]?.size ?? 20 }]);
  };

  // ✅ 슬라이더 변경 핸들러
  const handleSizeChange = (value: number | number[]) => {
    if (!checkedItems[0]) return;
    const newSize = Array.isArray(value) ? value[0] : value;

    setCheckedItems([{ name: checkedItems[0].name, size: newSize }]);
    onCheckedItemsChange?.([{ name: checkedItems[0].name, size: newSize }]);
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
                    <Link href="/community/write"><p>조행기</p></Link>
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
            {type === "check" && checkedItems[0] && (
              <div className={styles.type_radio}>
                <header>
                  <button type="button" className="link_cancel" onClick={onClose}>취소</button>
                  <button type="button" className="btn_save">등록</button>
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
                            checked={checkedItems[0].name === fish.name}
                          />
                          <label htmlFor={fish.name}>{fish.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ✅ 어종 크기 슬라이더 */}
                  <div className="fish_size_slider_wrap">
                    <Image 
                      src={fishTypeArry.find(f => f.name === checkedItems[0].name)?.imgSrc || ""}
                      alt="fish"
                      width={0}
                      height={200}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      style={{
                        objectFit: "contain",
                        height: "auto",
                        width: `${(checkedItems[0].size / 70) * 100}%`,
                        transition: "width 0.2s ease",
                      }}
                      priority
                    />
                    
                    <h4>{checkedItems[0].name} 크기 : {checkedItems[0].size}cm</h4>
                    <Slider
                      min={10}
                      max={70}
                      step={1}
                      value={checkedItems[0].size}
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
                      <input type="text" name="nickname" placeholder="별명 입력" />
                    </div>
                  </div>

                  {/* 설명 입력 */}
                  <AutoResizeTextarea />
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
