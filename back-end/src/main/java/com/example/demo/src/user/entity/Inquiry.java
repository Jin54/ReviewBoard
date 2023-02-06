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
@Table(name = "INQUIRY")

public class Inquiry {
    @Id // PK를 의미하는 어노테이션
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String writer;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false, length = 25)
    private String createdAt;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = true)
    private Boolean answerChk;

}
