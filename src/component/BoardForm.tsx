'use client'

import { useState } from 'react'
import axios from 'axios';

interface BoardFormProps {
    onPostSuccess: () => void; // 게시글 작성 성공 시 호출할 함수
}

export default ({onPostSuccess}:BoardFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8090/api/boards', { title, content });
      setTitle('');
      setContent('');
      onPostSuccess(); // 게시글 작성 성공 시 목록을 업데이트
    } catch (error) {
      console.error('Error creating board:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginTop: '40px'}}>
      <h2>게시글 작성</h2>
      <label>제목:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>내용:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">작성</button>
    </form>
  );
};