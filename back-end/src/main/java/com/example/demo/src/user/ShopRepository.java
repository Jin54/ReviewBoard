package com.example.demo.src.user;

import com.example.demo.src.user.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    @Modifying
    @Query("SELECT s FROM Shop s ORDER BY RAND() ")
    List<Shop> findTop10();
    

    // 두점의 좌표의 거리를 구함
    @Query(value = "SELECT *, (6371*acos(cos(radians(lat))*cos(radians(37.3252708))*cos(radians(126.9386927)-radians(lon))+sin(radians(lat))*sin(radians(37.3252708))))\n" +
            "\t\t\tAS distance     \n" +
            "             FROM SHOP s    \n" +
            "             HAVING distance < 10\n" +
            "             ORDER BY distance asc", nativeQuery = true)
    Page<Shop> findAllBy(@Param("lat") Double lat,
                         @Param("lon") Double lon,
                         Pageable pageable);

}
