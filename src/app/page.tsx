'use client'

// import React, {useState, useEffect} from 'react'
// import axios from 'axios';
// import BoardList from '@/component/BoardList'
// import BoardForm from '@/component/BoardForm';
import { redirect } from 'next/navigation';

// interface Board{
//   id: number,
//   title: string,
//   content: string,
// }

const Home = () => {
  redirect('/intro');
  
  // const [boards, setBoards] = useState<Board[]>([])

  // const fetchBoards = async () => {
  //   try{
  //     const response = await axios.get('%{process.env.NEXT_PUBLIC_BACKEND_URL}/api/boards');
  //     setBoards(response.data);
  //   }catch(error){
  //     console.error('에러발생', error);
  //   }
  // }

  // useEffect(()=>{
  //   fetchBoards();
  // }, [])

  return (
    <div>
      {/* <h1>퐁당 - 조행기 게시판</h1>
      <BoardForm onPostSuccess={fetchBoards} />
      <BoardList boards={boards} /> */}
    </div>
  );
}

export default Home