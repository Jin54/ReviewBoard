package com.example.demo.src.user.controller;


import com.example.demo.common.Constant;
import com.example.demo.common.exceptions.BaseException;
import com.example.demo.common.oauth.OAuthService;
import com.example.demo.common.response.BaseResponse;
import com.example.demo.src.user.UserService;
import com.example.demo.src.user.model.GetReviewRes;
import com.example.demo.src.user.model.GetShopRes;
import com.example.demo.src.user.model.PostLoginReq;
import com.example.demo.src.user.model.PostShopRes;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.demo.common.response.BaseResponseStatus.FAILED_KAKAO_ACCESS_TOKEN;
import static com.example.demo.common.response.BaseResponseStatus.FAILED_KAKAO_LOGIN;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/kakaoLogin")
public class UserController {


    private final UserService userService;

    private  final OAuthService oAuthService;
    /**
     * KAKAO 로그인 API
     * [POST] /kakaoLogin
     *
     * @return BaseResponse<PostLoginRes>
     */
    @Operation(summary = "카카오 회원가입/로그인", description = "", tags = {"카카오 회원가입/로그인"})
    @ResponseBody
    @PostMapping("")
    public BaseResponse<PostShopRes> kakaoLogIn(@RequestBody PostLoginReq postLoginReq) {

        System.out.println(postLoginReq.getAccess_token());
        if (postLoginReq.getAccess_token() == null)
            throw new BaseException(FAILED_KAKAO_ACCESS_TOKEN);


        //Zu_S6mCyfk7EexxKFobs6ZAygjWjhq1fDeesX8kSCj11GgAAAYZ4APY8
        String info[] = oAuthService.getProfile(Constant.SocialLoginType.KAKAO, postLoginReq.getAccess_token());
        if (info[0] == null)
            throw new BaseException(FAILED_KAKAO_LOGIN);


        PostShopRes postShopRes = userService.logIn(info);

        return new BaseResponse<>(postShopRes);
    }

}

//{
//        "fromLat": 126.4165,
//        "toLat": 127.5168,
//        "fromLon": 36.3360,
//        "toLon": 37.974
//        }