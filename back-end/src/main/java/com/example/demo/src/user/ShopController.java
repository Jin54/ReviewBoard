package com.example.demo.src.user;


import com.example.demo.common.Constant.SocialLoginType;
import com.example.demo.common.exceptions.BaseException;
import com.example.demo.common.response.BaseResponse;
import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.model.*;
import com.example.demo.utils.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.DataOutput;
import java.io.IOException;
import java.util.List;

import static com.example.demo.common.response.BaseResponseStatus.POST_USERS_INVALID_EMAIL;
import static com.example.demo.common.response.BaseResponseStatus.USERS_EMPTY_EMAIL;
import static com.example.demo.utils.ValidationRegex.isRegexEmail;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/shop")
public class ShopController {


    private final ShopService shopService;


    /* 연결 테스트 API
     * [GET] /shop/test
     * @return BaseResponse<String>
     */
    @Operation(summary = "연결 확인", description = "", tags = {"Test"})
    @ResponseBody
    @GetMapping("/test") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<String> getTestLog() {
        String result = "연결 성공";
        return new BaseResponse<>(result);
    }

    /* 랜덤 음식점 10개 조회
     * [GET] /shop/random
     * @return BaseResponse<GetShopRes>
     */
    @Operation(summary = "무작위 음식점 10개", description = "", tags = {"무작위 음식점"})
    @ResponseBody
    @GetMapping("/random") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetShopRes>> getShopRandom() {
        List<GetShopRes> getShopResList = shopService.getShopRandom();
        return new BaseResponse<>(getShopResList);
    }

    /* 음식점 좌표 paging 조회 API
     * [GET] /shop/coord
     * @return BaseResponse<GetShopRes>
     */
    @Operation(summary = "좌표 중심 탐색", description = "", tags = {"좌표 중심 탐색"})
    @ResponseBody
    @GetMapping("/coord") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetShopRes>> getShopPaging(
            @RequestParam(defaultValue = "1", name = "페이지인덱스") int pageIndex,
            @RequestParam(defaultValue = "10", name = "페이지사이즈") int pageSize,
            @RequestParam(defaultValue = "37.5666805", name = "위도") Double lat,
            @RequestParam(defaultValue = "126.9784147", name = "경도") Double lon
    ) {
        List<GetShopRes> getShopResList = shopService.getShopByCoord(pageIndex, pageSize, lat, lon);

        return new BaseResponse<>(getShopResList);
    }


}
