const CLIENT_ID = "a346d40eafa323e47fdde3d0e8301b75"; // Rest API 키
const REDIRECT_URI =  "https://localhost:3000/kakaologin";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;