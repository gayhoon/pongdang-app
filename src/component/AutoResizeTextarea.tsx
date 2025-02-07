"use client"

import { useState, useEffect, useRef } from "react";

export default function AutoResizeTextarea() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화하여 스크롤 제거
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // 내용에 맞춰 높이 조절
    }
  }, [text]); // text 값이 변경될 때마다 실행

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="내용 입력"
    />
  );
}
