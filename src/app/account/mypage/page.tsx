"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";

import styles from "./page.module.scss";

import Image from 'next/image'
import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcHeaderHome from "@/images/icons/ic_header_home.svg"
import IcSetting from "@/images/icons/ic_setting.svg"

const Mypage = () => {
  const { user } = useAuth();
  const [nickname, setNickname] = useState("");
  const [modifyNicknameMode, setModifyNicknameMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState("")

  const router = useRouter();

  // 닉네임 수정 모드 토글
  const toggleModifyNicknameMode = () =>{
    setModifyNicknameMode(!modifyNicknameMode);
  }

  // 닉네임 변경
  const handleModifyNickname = async () => {
    try{
      // FormData를 사용하면 헤더에 굳이 json을 명시하지 않아도 json으로 전송된ㄷ다.
      const formData = new FormData();
      formData.append("nickname", nickname);

      const response = await fetch("http://localhost:8090/api/v1/user/updateNickname",{
        method: "PATCH", // PATCH를 사용하면 부분 업데이트가 가능하다
        credentials: "include",
        body: formData, // PATCH를 사용해 부분 업데이트 할것이므로 JSON내 nickname 처리 필요
      });

      // const data = await response.json(); // 서버에서 반환된 데이터

      if(response.ok){
        alert("닉네임이 변경되었습니다.")
        toggleModifyNicknameMode();
      }else{
        throw new Error("닉네임 변경 실패");
      }
    }catch(error){
      console.error("닉네임 변경 실패:", error)
      alert("닉네임 변경에 실패했습니다. 관리자에 문의 요청드립니다.")
    }
  }

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]); // ✅ 선택한 파일을 상태에 저장
    }
  };

  // 프로필 업로드
  const handleProfileUpload = async () => {
    
    if(!selectedImage){
      alert("이미지를 선택해주세요");
      return
    }

    const formData = new FormData();
    formData.append("file", selectedImage); // 'file' 키로 이미지 추가
    console.log(selectedImage)

    try{
      const response = await fetch("http://localhost:8090/api/v1/user/uploadProfileImage",{
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if(response.ok){
        const imageUrl = await response.text();
        alert("프로필 사진이 변경되었습니다");
        setProfileImage(imageUrl);
      }else{
        throw new Error("업로드 실패");
      }

    }catch(error){
      console.error("업로드 오류", error)
    }
  }

  useEffect(()=>{
    if(selectedImage){
      if(confirm("프로필 사진을 저장하시겠습니까?")){
        handleProfileUpload()
      }else{
        setSelectedImage(null);
        return
      }
    }
  },[selectedImage])

  useEffect(()=>{
    if(user?.nickname !== undefined){
      setNickname(user.nickname);
    }
  },[user])

  useEffect(()=>{
    setModifyNicknameMode(false);
    if(user?.profileImage){
      setProfileImage(user.profileImage)
    }
  },[])

  return (
    <div className={styles.mypage_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={()=>router.back()} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>마이페이지</h2></div>
        <div className={styles.right}>
          <button type="button" onClick={()=>router.push("/community/fishingTrip")}><IcHeaderHome /></button>
        </div>
      </header>
      <div className={styles.mypage_min}>
        <section>
          <h2>내 정보</h2>
          <div className={styles.myinfo_wrap}>
            <div className={styles.thumb_wrap}>
              <div className={styles.thumb_min}>
                {profileImage ? (
                  <Image
                  src={`http://localhost:8090${profileImage}`}
                  alt="프로필사진"
                  width={200}
                  height={150}
                  style={{ objectFit: "cover", width: '100%', height: '100%' }}
                  priority
                />
                ): (
                  <Image
                    src="/images/img_profile_picture.png"
                    alt="프로필사진"
                    width={200}
                    height={150}
                    style={{ objectFit: "cover", width: '100%', height: '100%' }}
                    priority
                  />
                )}
              </div>
              <label htmlFor="file-upload"></label>
              <input type="file" accept="image/*" id="file-upload" onChange={handleFileChange} placeholder='' />
            </div>
            <div className={styles.nickname_wrap}>
              <div className={styles.nickname_min}>
                {modifyNicknameMode ? (
                  <>
                    <input type="text" placeholder='닉네임 최대 12자' maxLength={12} name="" id="" value={nickname} onChange={(e)=>setNickname(e.target.value)} />
                    <button type="button" onClick={handleModifyNickname}>저장</button>
                  </>
                ) : (
                  <>
                    <p>{nickname}</p>
                    <button type="button" onClick={toggleModifyNicknameMode}>편집</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2>내가 쓴 글</h2>
          <p className={styles.notice}>현재 준비중입니다. 빠른 시일내에 서비스 제공하도록 하겠습니다!</p>
        </section>
        <section>
          <h2>내가 쓴 댓글</h2>
          <p className={styles.notice}>현재 준비중입니다. 빠른 시일내에 서비스 제공하도록 하겠습니다!</p>
        </section>
        <section>
          <h2>관리</h2>
          <ul>
            <li>
              <button type="button" onClick={()=>router.push("/account/mypage/settings")}>
                <div className={styles.icon_min}><IcSetting /></div>
                <p>설정</p>
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Mypage;
