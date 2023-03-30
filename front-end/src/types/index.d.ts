export {};

declare global {
  interface Window {
    kakao: any; // 지도
    Kakao: any; // 로그인
  }
}

// 참고 사이트
// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window
