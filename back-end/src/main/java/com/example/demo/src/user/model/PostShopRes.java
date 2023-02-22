package com.example.demo.src.user.model;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostShopRes {
    @Schema(description = "",  nullable = false)
    private Long id;
    @Schema(description = "",  nullable = false)
    private String jwt;
    @Schema(description = "",  nullable = false)
    private String email;
    @Schema(description = "",  nullable = false)
    private String name;

    public PostShopRes(Long id, String jwt, String email,String name) {
        this.id = id;
        this.jwt = jwt;
        this.email = email;
        this.name=name;
    }
}
