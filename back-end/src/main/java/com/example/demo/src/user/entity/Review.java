package com.example.demo.src.user.entity;

import com.example.demo.common.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(callSuper = false)
@Getter
@Entity // 필수, Class 를 Database Table화 해주는 것이다
@Table(name = "REVIEW") // Table 이름을 명시해주지 않으면 class 이름을 Table 이름으로 대체한다.
public class Review  {

    @Id // PK를 의미하는 어노테이션
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, length = 255)
    private String rating;
    @Column(nullable = true)
    private String content;

    @Column(nullable = true, length = 25)
    private String createAT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Shop shop;




}
