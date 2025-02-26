"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ value, onChange }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => textareaRef.current || ({} as HTMLTextAreaElement)); // ✅ null 방지

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="내용 입력"
      />
    );
  }
);

// ✅ `displayName` 추가 (ESLint `react/display-name` 오류 해결)
AutoResizeTextarea.displayName = "AutoResizeTextarea";

export default AutoResizeTextarea;
