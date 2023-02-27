package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.ReviewHospital;
import com.example.demo.src.user.entity.ReviewShop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetReviewRes {

    private Long id;


    private Double rating;

    private String content;


    private String createAT;





    public GetReviewRes(ReviewShop reviewShop) {
        this.id = reviewShop.getId();
       this.rating= reviewShop.getRating();
       this.content= reviewShop.getContent();
       this.createAT= reviewShop.getCreateAT();
    }
    public GetReviewRes(ReviewHospital reviewHospital) {
        this.id = reviewHospital.getId();
        this.rating= reviewHospital.getRating();
        this.content= reviewHospital.getContent();
        this.createAT= reviewHospital.getCreateAT();
    }
}
