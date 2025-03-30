"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./KakaoMapWithSelect.module.scss"
import IcMyLocation from "@/images/icons/ic_mylocation.svg"
import IcMapSearch from "@/images/icons/ic_mapsearch.svg"

interface KakaoMouseEvent {
  latLng: {
    getLat: () => number;
    getLng: () => number;
  };
}

interface Coordinates {
  lat: number;
  lng: number;
}

export default function KakaoMapWithSelect() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);

  // 🆕 지도와 마커를 따로 저장 (재사용 목적)
  const kakaoMap = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  // 주소로 검색 시 검색어
  const [searchText, setSearchText] = useState<string>('');

  // 위도경도로 받아온 주소정보
  const [address, setAddress] = useState<string | null>(null);

  // 검색창 오픈상태
  const [searchbarOpen, setSearchbarOpen] = useState<boolean>(false);

  // 지도 및 마커 초기화
  const initializeMap = () => {
    if (!mapRef.current || !coords || !window.kakao?.maps) return;

    const { LatLng, Map, Marker, event } = window.kakao.maps;

    if (!kakaoMap.current) {
      const map = new Map(mapRef.current, {
        center: new LatLng(coords.lat, coords.lng),
        level: 3,
      });
      kakaoMap.current = map;

      const marker = new Marker({
        position: new LatLng(coords.lat, coords.lng),
      });
      marker.setMap(map);
      markerRef.current = marker;

      // 클릭 시 마커 이동 + 좌표 저장
      event.addListener(map, 'click', (mouseEvent: KakaoMouseEvent) => {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        setCoords({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
        handleChangeToAddress(latlng.getLat(), latlng.getLng());
      });
    } else {
      const latlng = new LatLng(coords.lat, coords.lng);
      kakaoMap.current.panTo(latlng);
      markerRef.current?.setPosition(latlng);
    }
  };

  // 스크립트 로드 및 초기화
  useEffect(() => {
    if (!coords) return;

    const scriptId = 'kakao-map-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      if (window.kakao?.maps) {
        window.kakao.maps.load(initializeMap);
      } else {
        existingScript.addEventListener('load', () => {
          window.kakao.maps.load(initializeMap);
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    script.async = false;
    script.onload = () => {
      window.kakao.maps.load(initializeMap);
    };
    document.head.appendChild(script);
  }, [coords]);

  // 현재 위치 요청
  const setMyLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setCoords({ lat: 37.5665, lng: 126.9780 }); // 서울시청
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        handleChangeToAddress(position.coords.latitude,position.coords.longitude)
      },
      () => {
        setCoords({ lat: 37.5665, lng: 126.9780 });
      }
    );
  }

  // 최초 1회 - 현재 위치 요청
  useEffect(() => {
    setMyLocation();
  }, []);

  // 위도경도를 주소로 변환
  const handleChangeToAddress = async (lat:number, lng:number) => {
    const foundAddress = await getAddressFromCoords(lat, lng);
    setAddress(foundAddress);
  }

  // 지명으로 검색
  const searchAddressToCoords = async (keyword: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );
  
      const data = await res.json();
  
      if (data.documents.length === 0) return null;
  
      const { x, y } = data.documents[0]; // x: 경도(lng), y: 위도(lat)
      await handleChangeToAddress(y, x);
      console.log(x)
      setSearchbarOpen(false);
      return { lat: parseFloat(y), lng: parseFloat(x) };
    } catch (err) {
      console.error('주소 검색 실패:', err);
      return null;
    }
  };

  const handleSearch = async () => {
    const result = await searchAddressToCoords(searchText);
    if (result) {
      setCoords(result); // ← 지도 중심/마커 이동 가능
    } else {
      alert('해당 장소를 찾을 수 없습니다.');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
      setSearchbarOpen(false); // 바깥 클릭 시 상태 변경
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 좌표를 주소정보 요청
  const getAddressFromCoords = async (lat: number, lng: number): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );
  
      const data = await res.json();
  
      if (data.documents.length === 0) return null;
  
      const address = data.documents[0].address;
      return address.address_name; // 도로명 or 지번 주소
    } catch (err) {
      console.error('역지오코딩 실패:', err);
      return null;
    }
  };

  return (
    <div className={styles.kakaomap_write_wrap}>
      <h2>장소를 지도에서 선택해주세요</h2>
      <div ref={mapRef} className={styles.kakaomap_write_min}>
        <div ref={searchbarRef} className={!searchbarOpen ? `${styles.map_searchbar_wrap}` : `${styles.map_searchbar_wrap} ${styles.show}`}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="주소 또는 명칭을 입력해주세요."
            onKeyDown={(e)=>{
              if (e.key === "Enter") {  // Shift + Enter는 줄바꿈 허용
                e.preventDefault();  // 기본 엔터 입력 방지
                handleSearch();
              }
            }}
          />
          <button type="button" className={styles.btn_search} onClick={handleSearch}>찾기</button>
          <button type="button" className={styles.btn_search_open} onClick={()=>setSearchbarOpen(!searchbarOpen)}><IcMapSearch /></button>
        </div>
        <button type="button" className={styles.btn_mylocation} onClick={setMyLocation}><IcMyLocation /></button>
      </div>
      {coords && (
        <div className={styles.coordBox}>
          {/* <p>선택한 좌표:</p> */}
          {/* <p>위도: {coords.lat}</p> */}
          {/* <p>경도: {coords.lng}</p> */}
          <p>주소 : {address}</p>
        </div>
      )}
    </div>
  );
}
