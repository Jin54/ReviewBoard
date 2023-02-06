package com.example.demo.src.user;

import com.example.demo.src.user.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    @Modifying
    @Query( "SELECT s FROM Shop s ORDER BY RAND() ")
    List<Shop> findTop10();

}
