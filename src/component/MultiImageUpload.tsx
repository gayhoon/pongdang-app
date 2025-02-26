"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import IcCamera from "@/images/icons/ic_camera.svg";
import IcPictureDel from "@/images/icons/ic_picture_del.svg";
import styles from "./MultiImageUpload.module.scss";

interface MultiImageUploadProps {
  onChange: (files: File[]) => void; // ✅ 부모 컴포넌트로 파일 전달
}

export default function MultiImageUpload({ onChange }: MultiImageUploadProps) {
  const MAX_IMAGES = 10; // 최대 이미지 개수
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // ✅ 미리보기용 Base64 데이터
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // ✅ 실제 업로드할 File 객체

  // ✅ `selectedFiles`가 변경될 때만 부모 컴포넌트에 업데이트
  useEffect(() => {
    onChange(selectedFiles);
  }, [selectedFiles, onChange]);

  // 파일 선택 & 카메라 촬영 핸들러
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (selectedFiles.length + newFiles.length < MAX_IMAGES) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prevImages) => [...prevImages, reader.result as string]);
        };
        reader.readAsDataURL(file);
        newFiles.push(file);
      }
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, MAX_IMAGES));

    if (selectedFiles.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장까지 등록 가능합니다.`);
    }
  }, [selectedFiles]);

  // 사진 삭제 핸들러
  const handleDeleteImage = useCallback((index: number) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  return (
    <div className={styles.pictures_upload_wrap}>
      <label className={styles.pictures_upload}>
        <IcCamera />
        <p>
          <span>{imagePreviews.length}</span> / <span>{MAX_IMAGES}</span>
        </p>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      </label>

      {imagePreviews.map((src, index) => (
        <div key={index} className={styles.picture}>
          <Image src={src} alt={`Uploaded ${index}`} width={100} height={100} style={{ objectFit: "cover", borderRadius: "8px" }} />
          <button className={styles.btn_picture_del} onClick={() => handleDeleteImage(index)}>
            <IcPictureDel />
          </button>
        </div>
      ))}
    </div>
  );
}
