package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetShopRes {

    //아이디
    private Long id;
    //이름
    private String name;
    //전화번호
    private String number;
    //지번주소
    private String numberAddress;
    //도로명주소
    private String roadAddress;
    //위도
    private String lat;
    //경도
    private String lon;
    //대표이미지
    private String thumbnail;
    //리뷰총 갯수
    private Long review_number;

    //리뷰 평균
    private Double review_rating;


    public GetShopRes(Shop shop, Long reviewCounter, Double reviewRating) {
        this.id = shop.getId();
        this.name = shop.getShop_name();
        this.number = shop.getSort();
        this.numberAddress = shop.getNumberAddress();
        this.roadAddress = shop.getRoadAddress();
        this.lat = shop.getLat();
        this.lon = shop.getLon();
        this.thumbnail=shop.getThumbnail();

        this.review_number = reviewCounter;
        if (Double.isNaN(reviewRating))
            reviewRating = 0D;

        this.review_rating = (double) Math.round(reviewRating * 10) / 10;
    }
}
