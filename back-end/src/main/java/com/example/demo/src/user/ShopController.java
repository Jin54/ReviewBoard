package com.example.demo.src.user;


import com.example.demo.common.Constant.SocialLoginType;
import com.example.demo.common.exceptions.BaseException;
import com.example.demo.common.response.BaseResponse;
import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.model.*;
import com.example.demo.utils.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.example.demo.common.response.BaseResponseStatus.POST_USERS_INVALID_EMAIL;
import static com.example.demo.common.response.BaseResponseStatus.USERS_EMPTY_EMAIL;
import static com.example.demo.utils.ValidationRegex.isRegexEmail;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/app/shop")
public class ShopController {


    private final ShopService shopService;



    /* 회원 1명 조회 API
     * [GET] /app/users/:userId
     * @return BaseResponse<GetUserRes>
     */
    // Path-variable
    @ResponseBody
    @GetMapping("") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetShopRes>> getShopRandom() {
        List<GetShopRes> getShopResList = shopService.getShopRandom();
        return new BaseResponse<>(getShopResList);
    }



}
