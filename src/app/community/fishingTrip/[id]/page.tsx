"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import {useAuth} from "@/context/AuthContext"

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Image from 'next/image';
import Link from "next/link";
import IcHeaderArrow from "@/images/icons/ic_header_arrow.svg"
import IcBtnOverflowModify from "@/images/icons/ic_btn_overflow_modify.svg"
import IcBtnOverflowDelete from "@/images/icons/ic_btn_overflow_delete.svg"
import IcComment from "@/images/icons/ic_comment.svg"
import IcSmallTime from "@/images/icons/ic_small_time.svg"
import IcLike from "@/images/icons/ic_like.svg"
// import IcReply from "@/images/icons/ic_reply.svg"

import styles from "./page.module.scss"
import FishList from '@/component/FishList';
import ActionSheet from '@/component/ActionSheet';
import OverflowMenu from "@/component/OverflowMenu";
import KakaoMapPrint from "@/component/kakaomap/KakaoMapPrint";

export default function Read() {

  const { user } = useAuth();
  const { id } = useParams(); // ✅ URL에서 ID 가져오기
  const [post, setPost] = useState<FishingTrip | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedFish, setSelectedFish] = useState<FishingTripFish | null>(null)
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  // ✅ 특정 게시글 데이터 가져오기
  useEffect(() => {
    if(!id) return;
    getPostData();
    getComments();
  }, [id]);
  
  useEffect(()=>{
    // 댓글 작성 완료 후 댓글영역 맨 아래로 스크롤 이동
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShouldScrollToBottom(false); // 플래그 초기화
  },[shouldScrollToBottom])

  // 본인 글인 확인 후 isAuthor = true
  useEffect(()=>{
    if (!user || !post) return; // ✅ user와 post가 존재하는 경우에만 실행

    const isUserAuthor = user.nickname === post.authorNickname;

    if (isAuthor !== isUserAuthor) { // ✅ 상태가 변경될 때만 setState 실행
      setIsAuthor(isUserAuthor);
    }
  },[user?.nickname, post?.authorNickname]) 

  // 게시글 정보 요청
  const getPostData = async () =>{
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip/${id}`, {
      method: "GET",
    })
      .then((res) => {
        if(!res.ok){
          throw new Error(`게시글을 찾을 수 없습니다. (HTTP ${res.status})`);
        }
        return res.json()}
      )
      .then((data) => setPost(data))
      .catch((error) => console.error("게시글 불러오기 실패:", error))
  }

  // 댓글 정보 요청
  const getComments = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip/comments/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    setComments(data);
  }

  // 게시글 삭제 요청
  const handleDelete = async () => {    
    if(!id){
      alert("삭제할 게시글이 존재하지 않습니다.");
      return
    }

    if (!confirm("정말 삭제하시겠습니까?")) return;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip/${Number(id)}`, {
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
  const addComment = async () => {
    if (!newComment.trim()) return; // 공백 방지
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip/comments/${Number(id)}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",  // ✅ JSON 타입 설정
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error(`댓글 작성 실패: ${response.status}`);
      }
      
      const newCommentData = await response.json();

      // ✅ 기존 comments에 새 댓글 추가
      setComments((prevComments)=>[...prevComments, newCommentData]);

      // 스크롤 플래그 활성화 → 렌더링 이후 useEffect에서 스크롤
      setShouldScrollToBottom(true)

      // 입력창 초기화
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  // 날짜 포맷 변경
  const formatTimeAgo = (createdAt: string): string => {
    const createdTime = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - createdTime.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
  
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      // 날짜 자체 표시 (예: 2024.03.21)
      return createdTime.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).replace(/\.\s/g, '.').replace('.', '.');
    }
  };
  

  // 좋아요 토글 실행
  const toggleLike = async (commentId: number) =>{
    if(user){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fishingTrip/comments/${commentId}/like`, {
          method: "POST",
          credentials: "include",
        });
    
        if (response.ok) {
          const result = await response.json();

          setComments((prevComments)=>{
            return prevComments.map((comment)=>{
              if(comment.id == commentId){
                return {...comment, likeCount: result.likeCount}
              }else{
                return comment;
              }
            })
          })

          // 게시글 정보 다시 불러오기
          // await getPostData();
        } else {
          throw new Error("좋아요 요청 실패");
        }
      } catch (error) {
        console.error("좋아요 요청 오류:", error);
      }
    }else{
      if(confirm("로그인이 필요합니다. 로그인 화면으로 이동할까요?")){
        router.push(`/account/login`);
      }else{
        return
      }
    }    
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
      {post && (
        <div className={styles.contents_wrap}>
          <div className={styles.contents_min}>
            <h3>{post.title}</h3>
              <div className={styles.write_info_wrap}>
                <div className={styles.user_picture}>
                  {post.authorProfileImage ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.authorProfileImage}`}
                      alt="썸네일"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    />
                  ):(
                    <Image
                      src="/images/img_profile_picture.png"
                      alt="썸네일"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                      priority
                    />
                  )}
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
              <div className={styles.image_wrap}>
                {post.images && post.images.length > 0 && (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={false}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                  >
                    {post.images.map((image, index)=>(
                      <SwiperSlide key={index}>
                        <Image
                        src={image}
                        alt="썸네일"
                        width={1000}
                        height={1000}
                        style={{ objectFit: "contain", width: '100%', height: 'auto' }}
                        priority
                      />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
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
              <div className={styles.location_wrap}>
                <h2>장소</h2>
                <div className={styles.location_min}>
                  <p>{post.location}</p>
                    {!post.location && (
                      <p className={styles.has_not}>장소가 등록되지 않았습니다</p>
                    )}
                </div>
                <KakaoMapPrint />
              </div>
          </div>
          <hr />
          <div className={styles.comment_list_wrap}>
            <div className={styles.top}>
              <div className={styles.count}>
                <IcComment />
                <p>댓글 {post.comments.length}</p>
              </div>
            </div>
            <ul>
              {comments.map((data)=>(
                <li key={data.id} className={styles.comment_item_wrap}>
                  <div className={styles.comment_item}>
                    <div className={styles.profile}>
                      {data.authorProfileImage ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.authorProfileImage}`}
                          alt="썸네일"
                          width={100}
                          height={100}
                          style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                          priority
                        />
                      ) : (
                        <Image
                          src="/images/img_profile_picture.png"
                          alt="썸네일"
                          width={100}
                          height={100}
                          style={{ objectFit: "contain", width: 'auto', height: 'auto' }}
                          priority
                        />
                      )}
                    </div>
                    <div className={styles.comment_content_wrap}>
                      <div className={styles.writer_info}>
                        <p className={styles.nickname}>{data.authorNickname}</p>
                        <div className={styles.time}>
                          <IcSmallTime />
                          <p>{formatTimeAgo(data.createdAt)}</p>
                        </div>
                      </div>
                      <p className={styles.comment_text}>{data.content}</p>
                      <div className={styles.props}>
                        <div className={styles.left}>
                          <div className={user ? `${styles.like} ${styles.i_like}` : `${styles.like}`} onClick={()=>toggleLike(data.id)}>
                            <IcLike />
                            <p>{data.likeCount}</p>
                          </div>
                          {/* <div className={styles.reply_count}>
                            <IcReply />
                            <p>33</p>
                          </div> */}
                        </div>
                        <div className={styles.right}></div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.comment_item_reply}></div>    
                  {/* 댓글 작성하면 scroll 이동시킬 ref (해당 dom은 눈에 안보임) */}
                  <div ref={commentsEndRef}></div>     
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {user &&(
        <div className={styles.comment_write_wrap}>
          <textarea name="" id="" value={newComment} 
            onChange={(e)=>setNewComment(e.target.value)} 
            placeholder="댓글을 남겨주세요"
            onKeyDown={(e)=>{
              if (e.key === "Enter" && !e.shiftKey) {  // Shift + Enter는 줄바꿈 허용
                e.preventDefault();  // 기본 엔터 입력 방지
                addComment();
              }
            }}
            ></textarea>
          <button type="button" onClick={addComment}>등록</button>
        </div>
      )}
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