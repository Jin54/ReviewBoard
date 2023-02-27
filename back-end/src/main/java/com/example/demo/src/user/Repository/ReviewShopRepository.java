package com.example.demo.src.user.Repository;

import com.example.demo.src.user.entity.ReviewShop;
import com.example.demo.src.user.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewShopRepository extends JpaRepository<ReviewShop, Long> {
    //shop_id 와같은것을 카운트함
    Long countByShop(Shop shop);


    //shop_id 와 같은 로우의 raiting을 총합을 구하고 null값이면 0을 반환함
    @Query("SELECT COALESCE(sum(r.rating),0)  from ReviewShop r where r.shop=:shop_id")
    Double sumRatingByShop(@Param("shop_id") Shop shop);


    @Query("SELECT r from ReviewShop r  where r.shop=:shop_id order by r.id asc ,LENGTH(r.content) desc ")
    Page<ReviewShop> findAllByShop(@Param("shop_id")Shop shop, Pageable pageable);
}
