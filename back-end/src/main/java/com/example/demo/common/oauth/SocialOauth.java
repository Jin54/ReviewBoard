package com.example.demo.common.oauth;
import com.example.demo.common.Constant.SocialLoginType;

public interface SocialOauth {
    /**
     * 각 소셜 로그인 페이지로 redirect할 URL build
     * 사용자로부터 로그인 요청을 받아 소셜 로그인 서버 인증용 코드 요청
     */
    String getOauthRedirectURL();

    /**
     * API Server로부터 받은 code를 활용하여 사용자 인증 정보 요청
     *
     * @param code API Server 에서 받아온 code
     * @return API 서버로 부터 응답받은 Json 형태의 결과를 string으로 반
     */
    String requestAccessToken(String code);

    /**
     *  accessToken 활용하여 사용자 이메일 요청
     * @param accessToken
     * @return email
     */
    String[] getProfile(String accessToken) ;
    default SocialLoginType type() {
        if (this instanceof KakaoOauth) {
            return SocialLoginType.KAKAO;
        } else {
            return null;
        }

//        if (this instanceof GoogleOauth) {
//            return SocialLoginType.GOOGLE;
//        } else


    }

}
