package com.example.demo.common.oauth;

import com.example.demo.common.Constant;
import com.example.demo.common.Constant.SocialLoginType;
import com.example.demo.common.exceptions.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static com.example.demo.common.response.BaseResponseStatus.FAILED_KAKAO_LOGIN;


@Service
@RequiredArgsConstructor
public class OAuthService {


    private final List<SocialOauth> socialOauthList;
    private final HttpServletResponse response;

    public String request(SocialLoginType socialLoginType) {
//        SocialOauth socialOauth = this.findSocialOauthByType(socialLoginType);
//        String redirectURL = socialOauth.getOauthRedirectURL();
//        System.out.println("\n>>>url:::");
//        System.out.println(redirectURL);
//
//        try {
//            response.sendRedirect(redirectURL);
//            return redirectURL;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
        throw new BaseException(FAILED_KAKAO_LOGIN);
    }

    public String requestAccessToken(SocialLoginType socialLoginType, String code) {
        SocialOauth socialOauth = this.findSocialOauthByType(socialLoginType);
        return socialOauth.requestAccessToken(code);
    }

    private SocialOauth findSocialOauthByType(SocialLoginType socialLoginType) {
        return socialOauthList.stream()
                .filter(x -> x.type() == socialLoginType)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("알 수 없는 socialType"));
    }

    public  String[] getProfile(SocialLoginType socialLoginType, String accessToken){
        SocialOauth socialOauth = this.findSocialOauthByType(socialLoginType);
        return socialOauth.getProfile(accessToken);
    }


}
