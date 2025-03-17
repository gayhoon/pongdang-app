"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import {useAuth} from "@/context/AuthContext"

import Image from 'next/image';
import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcBtnOverflowModify from "@/images/icons/ic_btn_overflow_modify.svg"
import IcBtnOverflowDelete from "@/images/icons/ic_btn_overflow_delete.svg"
import styles from "./page.module.scss"
import FishList from '@/component/FishList';
import ActionSheet from '@/component/ActionSheet';
import OverflowMenu from "@/component/OverflowMenu";

export default function Read() {

  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams(); // ✅ URL에서 ID 가져오기
  const [post, setPost] = useState<FishingTrip | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedFish, setSelectedFish] = useState<FishingTripFish | null>(null)
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);
  

  // ✅ 특정 게시글 데이터 가져오기
  useEffect(() => {
    if (!id) return;
    setLoading(true); //API 요청 시작 전 로딩 상태 true
    fetch(`http://localhost:8090/api/v1/fishingTrip/${id}`)
      .then((res) => {
        if(!res.ok){
          throw new Error(`게시글을 찾을 수 없습니다. (HTTP ${res.status})`);
        }
        return res.json()}
      )
      .then((data) => setPost(data))
      .catch((error) => console.error("게시글 불러오기 실패:", error))
      .finally(()=> setLoading(false)); // 요청 완료 후 로딩 상태 해제
  }, [id]);

  // 본인 글인 확인 후 isAuthor = true
  useEffect(()=>{
    if (!user || !post) return; // ✅ user와 post가 존재하는 경우에만 실행

    const isUserAuthor = user.nickname === post.authorNickname;

    if (isAuthor !== isUserAuthor) { // ✅ 상태가 변경될 때만 setState 실행
      setIsAuthor(isUserAuthor);
    }
  },[user?.nickname, post?.authorNickname]) 

  // 게시글 삭제 요청
  const handleDelete = async () => {    
    if(!id){
      alert("삭제할 게시글이 존재하지 않습니다.");
      return
    }

    if (!confirm("정말 삭제하시겠습니까?")) return;
  
    try {
      const response = await fetch(`http://localhost:8090/api/v1/fishingTrip/${Number(id)}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("게시글이 삭제되었습니다.");
        setPost(null); // ✅ 삭제된 게시글을 null로 설정
        router.push('/community/fishingTrip'); // 메인 페이지로 이동
      } else {
        alert("실패")
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 게시글 수정 요청
  const handleUpdate = () => {
    router.push(`/community/fishingTrip/write?id=${id}`); // 메인 페이지로 이동
  }

  // ✅ 댓글 작성 함수
  const addComment = async (content: any) => {

    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/fishingTrip/${Number(id)}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ JWT 토큰 추가
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error(`댓글 작성 실패: ${response.status}`);
      }

      return await response.json(); // ✅ 작성된 댓글 데이터 반환
    } catch (error) {
      console.error(error);
      return null;
    } finally {
    }
  };


  // 로딩 중일 때
  if(loading){
    return <>게시글을 불러오는 중 ...</>
  }

  // 데이터가 들어오지 않았을 때
  if(!post){
    return <>게시글을 찾을 수 없습니다.</>
  }

  return (
    <div className={styles.layout_read_wrap}>
      <header className={styles.layout_read_wrap_header}>
        <div className={styles.left}>
          <Link href="" onClick={(e)=>{
            // 만약 본 페이지로 오기 전 페이지 경로가 /write인 경우
            if(document.referrer.includes("/write")){
              // 글 목록으로 이동
              e.preventDefault();
              router.push("/community/fishingTrip")
            }else{
              // 이전 페이지로 이동
              e.preventDefault();
              router.back();
            }
          }} className="link_header_before"><IcHeaderArrow />뒤로가기</Link>
        </div>
        <div className={styles.center}><h2>조행기 게시판</h2></div>
        {isAuthor && (
          <div className={styles.right}>
            <OverflowMenu>
              <ul>
                <li><button type="button" onClick={handleUpdate}>수정<IcBtnOverflowModify/></button></li>
                <li><button type="button" onClick={handleDelete}>삭제<IcBtnOverflowDelete/></button></li>
              </ul>
            </OverflowMenu>
          </div>
        )}
      </header>
      <div className={styles.contents_wrap}>
        <div className={styles.contents_min}>
          <h3>{post.title}</h3>
          <div className={styles.write_info_wrap}>
            <div className={styles.user_picture}>
              <Image
                src={`http://localhost:8090${post.authorProfileImage}`}
                alt="썸네일"
                width={100}
                height={100}
                style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                priority
              />
            </div>
            <div className={styles.write_info_min}>
              <div className={styles.user_info}>
                <span className={styles.user_name}>{post.authorNickname}</span>
                <span className={styles.user_level}>완벽한 배서</span>
              </div>
              <div className={styles.write_info}>
                <p className={styles.time}>{post.date}</p>
                <p className={styles.view}>{post.viewCount}</p>
                {/* <p className={styles.like}>2</p> */}
              </div>
            </div>
          </div>
          <button type="button" onClick={addComment("fffff")}>댓글작성테스트</button>
          <div className={styles.image_wrap}>
            {post.images &&post.images.length > 0 && (
              <Image
                src={post.images[0]}
                alt="썸네일"
                width={1000}
                height={1000}
                style={{ objectFit: "contain", width: '100%', height: 'auto' }}
                priority
              />
            )}
          </div>
          
            <div className={styles.location_wrap}>
              <h2>장소</h2>
              <div className={styles.location_min}>
                <p>{post.location}</p>
                  {!post.location && (
                    <p className={styles.has_not}>장소가 등록되지 않았습니다</p>
                  )}
              </div>
            </div>
          <div className={styles.detail_wrap}>
            <div className={styles.detail_min}>
              <p>{post.detail}</p>
            </div>
          </div>
          <div className={styles.fish_list_wrap}>
            <FishList type="read" fishDetailOpen={(fish)=>{
                setSelectedFish(fish);
                setIsActionSheetOpen(true);
              }} fishes={post.fishes} />
            {post.fishes &&post.fishes.length == 0 && (
              <p className={styles.has_not}>물고기가 등록되지 않았습니다</p>
            )}
          </div>
        </div>
      </div>
      {isActionSheetOpen && (
        <ActionSheet 
          type="readMode" 
          isOpen={isActionSheetOpen}
          onClose={() => setIsActionSheetOpen(false)}
          fish={selectedFish}
        />
      )}
      
    </div>
  );
}
