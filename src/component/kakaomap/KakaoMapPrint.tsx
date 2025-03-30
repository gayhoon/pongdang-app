"use client";

import { useEffect, useRef } from "react";

import styles from "./KakaoMapPrint.module.scss"

export default function KakaoMapPrint() {

  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    // 이미 script가 있으면 다시 추가하지 않음
    if (document.getElementById('kakao-map-script')) return;

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    script.async = false;

    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          if (mapRef.current) {
            const map = new window.kakao.maps.Map(mapRef.current, {
              center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
              level: 3,
            });

            // 마커 추가 (옵션)
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(37.5665, 126.9780),
            });
            marker.setMap(map);
          }
        });
      }
    };

    // Clean up
    return () => {
      script.remove();
    };
  }, [])

  return (
    <div className={styles.kakaomap_print_wrap}>
      <div ref={mapRef} className={styles.kakaomap_print_min}></div>
    </div>
  );
}
