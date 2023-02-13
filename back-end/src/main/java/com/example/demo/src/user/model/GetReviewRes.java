package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Review_img;
import com.example.demo.src.user.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetReviewRes {

    private Long id;


    private Double rating;

    private String content;


    private String createAT;


    private List<String> imgList=new ArrayList<>();;



    public GetReviewRes(Review review, List<Review_img> imgList) {
        this.id = review.getId();
       this.rating= review.getRating();
       this.content=review.getContent();
       this.createAT=review.getCreateAT();

        for (Review_img Review_img : imgList) {
            String str = "https://firebasestorage.googleapis.com/v0/b/wnatedcv.appspot.com/o/review%2F" +
                    Review_img.getUrl() + ".png" + "?alt=media";
            this.imgList.add(str);
        }

    }
}
