package com.example.demo.src.user.entity;

import com.example.demo.common.entity.BaseEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(callSuper = false)
@Getter
@Entity // 필수, Class 를 Database Table화 해주는 것이다
@Table(name = "SHOP") // Table 이름을 명시해주지 않으면 class 이름을 Table 이름으로 대체한다.
public class Shop {

    @Id // PK를 의미하는 어노테이션
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 25)
    private String shop_name;

    @Column(nullable = true, length = 255)
    private String sort;
    @Column(nullable = false, length = 255)
    private String numberAddress;
    @Column(nullable = false, length = 255)
    private String roadAddress;
    @Column(nullable = false, length = 255)
    private String lat;
    @Column(nullable = false, length = 255)
    private String lon;
    @Column(nullable = true, length = 255)
    private String thumbnail;

}
