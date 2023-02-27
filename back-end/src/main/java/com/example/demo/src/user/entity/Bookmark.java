package com.example.demo.src.user.entity;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(callSuper = false)
@Getter
@Entity // 필수, Class 를 Database Table화 해주는 것이다
@Table(name = "BOOKMARK") // Table 이름을 명시해주지 않으면 class 이름을 Table 이름으로 대체한다.
public class Bookmark {

    @Id // PK를 의미하는 어노테이션
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Shop shop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Hospital hospital;

    public Bookmark(User user, Shop shop) {
        this.user = user;
        this.shop = shop;
    }

    public Bookmark(User user, Hospital hospital) {
        this.user = user;
        this.hospital = hospital;
    }
}
