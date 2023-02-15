package com.example.demo.src.user;


import com.example.demo.common.response.BaseResponse;
import com.example.demo.src.user.model.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    /* 연결 테스트 API
     * [GET] /shop/test
     * @return BaseResponse<String>
     */
    @Operation(summary = "모든 음식점 조회", description = "", tags = {"모든 음식점 조회"})
    @ResponseBody
    @GetMapping("") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetShopRes>> getShopAll(
            @RequestParam(defaultValue = "1") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        List<GetShopRes> getShopResList = shopService.getShopAll(pageIndex, pageSize);
        return new BaseResponse<>(getShopResList);
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
            @RequestParam(defaultValue = "1") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "37.5666805") double lat,
            @RequestParam(defaultValue = "126.9784147") double lon,
            @RequestParam(defaultValue = "300") int distance
    ) {
        List<GetShopRes> getShopResList = shopService.getShopByCoord(pageIndex, pageSize, lat, lon,distance);

        return new BaseResponse<>(getShopResList);
    }

    /* 음식점 좌표 paging 조회 API
     * [GET] /shop/coord
     * @return BaseResponse<GetShopRes>
     */
    @Operation(summary = "주소지 검색", description = "" +
            "경상북도, 전라북도 지번과 같은 형식 데이터 필요 경북x,전북x", tags = {"주소지 검색"})
    @ResponseBody
    @GetMapping("/address") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetShopRes>> getAddressPaging(
            @RequestParam(defaultValue = "1") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "서울특별시") String first,
            @RequestParam(defaultValue = "") String second
    ) {
        List<GetShopRes> getShopResList = shopService.getShopByAddress(pageIndex, pageSize, first, second);

        return new BaseResponse<>(getShopResList);
    }

    /* 음식점 리뷰 조회 paging 조회 API
     * [GET] /shop/coord
     * @return BaseResponse<GetShopRes>
     */
    @Operation(summary = "특정 음식점 상세 정보 요청", description = "", tags = {"특정 음식점 상세 정보 요청"})
    @ResponseBody
    @GetMapping("/{shopId}") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<GetShopRes> getShopReview(
            @PathVariable("shopId") Long shopId
    ) {
        GetShopRes getShopRes = shopService.getShopInfo(shopId);

        return new BaseResponse<>(getShopRes);
    }

    /* 음식점 리뷰 조회 paging 조회 API
     * [GET] /shop/coord
     * @return BaseResponse<GetShopRes>
     */
    @Operation(summary = "음식점 리뷰 요청", description = "", tags = {"음식점 리뷰 요청"})
    @ResponseBody
    @GetMapping("/{shopId}/review") // (GET) 127.0.0.1:9000/app/users/:userId
    public BaseResponse<List<GetReviewRes>> getShopReview(
            @RequestParam(defaultValue = "1") int pageIndex,
            @RequestParam(defaultValue = "10") int pageSize,
            @PathVariable("shopId") Long shopId
    ) {
        List<GetReviewRes> getReviewResList = shopService.getShopReview(pageIndex, pageSize, shopId);

        return new BaseResponse<>(getReviewResList);
    }



}

//{
//        "fromLat": 126.4165,
//        "toLat": 127.5168,
//        "fromLon": 36.3360,
//        "toLon": 37.974
//        }