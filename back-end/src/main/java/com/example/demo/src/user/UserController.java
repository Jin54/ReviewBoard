package com.example.demo.src.user;


import com.example.demo.common.exceptions.BaseException;
import com.example.demo.common.response.BaseResponse;
import com.example.demo.src.user.model.GetReviewRes;
import com.example.demo.src.user.model.GetShopRes;
import com.example.demo.src.user.model.PostLoginReq;
import com.example.demo.src.user.model.PostShopRes;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/kakaoLogin")
public class UserController {


    private final UserService userService;

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

//        String kakaoEmail = oAuthService.getProfile(IsOAuth.KAKAO, postLoginReq.getAccessToken());
//        if (kakaoEmail == null)
//            throw new BaseException(FAILED_KAKAO_LOGIN);
//
//        postLoginReq.setSocialInfo(kakaoEmail, IsOAuth.KAKAO);

        String kakaoEmail="mmm1103@naver.com";
        PostShopRes postShopRes = userService.logIn(kakaoEmail);

        return new BaseResponse<>(postShopRes);
    }

}

//{
//        "fromLat": 126.4165,
//        "toLat": 127.5168,
//        "fromLon": 36.3360,
//        "toLon": 37.974
//        }