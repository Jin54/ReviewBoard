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



    public GetShopRes(Shop shop,Long reviewCounter ,Double reviewRating) {
        this.id = shop.getId();
        this.name = shop.getName();
        this.number = shop.getNumber();
        this.numberAddress = shop.getNumberAddress();
        this.roadAddress = shop.getRoadAddress();
        this.lat = shop.getLat();
        this.lon = shop.getLon();
        this.thumbnail = "https://firebasestorage.googleapis.com/v0/b/gridgetest-2a0c6.appspot.com/o/jin%2F08a42836-367b-4ebd-b041-b2d2e881676cpng?alt=media&token=7fb57279-fae1-4694-89ce-12fd28de7ba9";

        this.review_number = reviewCounter;
        if (Double.isNaN(reviewRating))
            reviewRating=0D;

        this.review_rating = (double) Math.round(reviewRating*10)/10;
    }
}
