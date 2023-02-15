package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetShopCountRes {

    //아이디
    private Shop shop;
    //이름
    private Long count;
    //전화번호


    public GetShopCountRes(Shop shop, Long count) {
        this.shop = shop;
        this.count = count;
    }

    public GetShopCountRes(Shop shop, Long reviewCounter, Double reviewRating) {
       this.shop=shop;
    }
}
