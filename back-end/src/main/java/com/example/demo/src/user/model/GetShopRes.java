package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.Hospital;
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


    //전화번호
    private String number;
    //전화번호
    private String sort;
    //전화번호
    private String time;
    //전화번호
    private String info;

    //리뷰총 갯수
    private Long review_number;

    //리뷰 평균
    private Double review_rating;


    public GetShopRes(Shop shop, Long reviewCounter, Double reviewRating) {
        this.id = shop.getId();
        this.name = shop.getShop_name();

        this.numberAddress = shop.getNumberAddress();
        this.roadAddress = shop.getRoadAddress();
        this.lat = shop.getLat();
        this.lon = shop.getLon();
        this.thumbnail=shop.getThumbnail();

        this.number = shop.getNumber();
        this.sort=shop.getSort();
        this.info=shop.getInfo();
        this.time=shop.getTime();

        this.review_number = reviewCounter;
        if (Double.isNaN(reviewRating))
            reviewRating = 0D;

        this.review_rating = (double) Math.round(reviewRating * 10) / 10;
    }

    public GetShopRes(Hospital hospital, Long reviewCounter, Double reviewRating) {
        this.id = hospital.getId();
        this.name = hospital.getShop_name();

        this.numberAddress = hospital.getNumberAddress();
        this.roadAddress = hospital.getRoadAddress();
        this.lat = hospital.getLat();
        this.lon = hospital.getLon();
        this.thumbnail=hospital.getThumbnail();

        this.number = hospital.getNumber();
        this.sort=hospital.getSort();
        this.info=hospital.getInfo();
        this.time=hospital.getTime();

        this.review_number = reviewCounter;
        if (Double.isNaN(reviewRating))
            reviewRating = 0D;

        this.review_rating = (double) Math.round(reviewRating * 10) / 10;
    }
}
