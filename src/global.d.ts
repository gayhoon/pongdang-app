// src/global.d.ts 또는 src/types/global.d.ts
export {};

declare global {
  interface Window {
    kakao: any;
  }
}