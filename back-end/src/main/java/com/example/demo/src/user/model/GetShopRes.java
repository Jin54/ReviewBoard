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

    private Long id;
    private String name;
    private String number;
    private String numberAddress;
    private String roadAddress;
    private String lat;
    private String lon;
    private String thumbnail;

    private Long review_number;

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
