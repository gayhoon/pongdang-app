"use client"

import { useState, useCallback } from "react";
import Image from 'next/image'
import IcCamera from "@/images/icons/ic_camera.svg"
import IcPictureDel from "@/images/icons/ic_picture_del.svg"
import styles from "./MultiImageUpload.module.scss"

export default function MultiImageUpload() {

    const MAX_IMAGES = 10; // 최대 이미지 업로드 개수 설정
    const [images, setImages] = useState<string[]>([]); // 업로드된 이미지 목록

    // 파일 선택 & 카메라 촬영 핸들러
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
        const newImages: string[] = [];

        Array.from(files).forEach((file) => {
            if (images.length + newImages.length < MAX_IMAGES) { // 10장 초과 방지
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prevImages) => {
                if (prevImages.length >= MAX_IMAGES) return prevImages; // 추가 등록 차단
                return [...prevImages, reader.result as string];
                });
            };
            reader.readAsDataURL(file);
            }
        });

        // 초과 시 경고 메시지 출력
        if (images.length + files.length > MAX_IMAGES) {
            alert(`최대 ${MAX_IMAGES}장까지 등록 가능합니다.`);
        }
        }
    }, [images]);

    // 사진 삭제 핸들러
    const handleDeleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.pictures_upload_wrap}>
            <label className={styles.pictures_upload}>
                <IcCamera />
                <p><span>{images.length}</span> / <span>10</span></p>
                <input
                type="file"
                accept="image/*"
                multiple // 여러장 선택 가능
                onChange={handleFileChange}
                />
            </label>

            {images.map((src, index) => (
                <div key={index} className={styles.picture}>
                <Image
                    src={src}
                    alt={`Uploaded ${index}`}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <button className={styles.btn_picture_del} onClick={() => handleDeleteImage(index)}><IcPictureDel /></button>
                </div>
            ))}
        </div>
    );
}
