package com.example.demo.src.user.model;


import com.example.demo.src.user.entity.Shop;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostShopReq {


    @Schema(description = "",  nullable = false, example = "33.40")
    private double fromLat =33.40;
    @Schema(description = "",  nullable = false, example = "33.5")
    private double toLat =33.5;
    @Schema(description = "",  nullable = false, example = "126.9")
    private double fromLon = 126.9 ;
    @Schema(description = "",  nullable = false, example = "127")
    private double toLon =127;

    @Override
    public String toString() {
        return "PostShopReq{" +
                "fromLat=" + fromLat +
                ", toLat=" + toLat +
                ", fromLon=" + fromLon +
                ", toLon=" + toLon +
                '}';
    }


    //위도

}
