"use client";

import { useEffect } from "react";

import styles from "./KakaoMapPrint.module.scss"

export default function KakaoMapPrint() {

  useEffect(()=>{
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map')
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        }

        var map = new window.kakao.maps.Map(container, options)
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
  },[])

  return (
    <div className={styles.kakaomap_print_wrap}>
      <div id="map" className={styles.kakaomap_print_min}>카카오맵API사용권한 승인요청중<br/>(개발대기중)</div>
    </div>
  );
}
