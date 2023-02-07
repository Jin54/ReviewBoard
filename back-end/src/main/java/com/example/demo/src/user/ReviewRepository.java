package com.example.demo.src.user;

import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {


    Long countByShop(Shop shop);


    @Query("SELECT COALESCE(sum(r.rating),0)  from Review r where r.shop=:shop_id")
    Double sumRatingByShop(@Param("shop_id") Shop shop);
}
