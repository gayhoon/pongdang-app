"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import IcCamera from "@/images/icons/ic_camera.svg";
import IcPictureDel from "@/images/icons/ic_picture_del.svg";
import styles from "./MultiImageUpload.module.scss";

interface MultiImageUploadProps {
  onChange: (files: File[]) => void;
  existingImages?: string[]; // ✅ 기존 이미지 추가
  onDeleteImage?: (index: number, isExisting: boolean) => void; // ✅ 기존 이미지 삭제 핸들러 추가
}


export default function MultiImageUpload({ onChange, existingImages, onDeleteImage }: MultiImageUploadProps) {
  const MAX_IMAGES = 10; // 최대 이미지 개수
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // ✅ 미리보기용 Base64 데이터
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // ✅ 실제 업로드할 File 객체

  // ✅ 기존 이미지 반영
  useEffect(() => {
    setImagePreviews(existingImages ?? []);
  }, [existingImages]);

  // ✅ 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    onChange(newFiles);
  };

  // ✅ 이미지 삭제 핸들러
  const handleDelete = (index: number) => {
    const isExisting = (existingImages ?? []).includes(imagePreviews[index]);

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    onDeleteImage?.(index, isExisting);
  };

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
          <button className={styles.btn_picture_del} onClick={() => handleDelete(index)}>
            <IcPictureDel />
          </button>
        </div>
      ))}
    </div>
  );
}
