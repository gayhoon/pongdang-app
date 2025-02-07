"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    // ✅ 터치 줌 방지
    const preventZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    // ✅ 키보드 줌 방지 (iOS, Mac)
    const preventKeyZoom = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventZoom, { passive: false });
    document.addEventListener("keydown", preventKeyZoom);

    return () => {
      document.removeEventListener("touchmove", preventZoom);
      document.removeEventListener("keydown", preventKeyZoom);
    };
  }, []);

  return null; // 화면에 렌더링할 내용 없음
}