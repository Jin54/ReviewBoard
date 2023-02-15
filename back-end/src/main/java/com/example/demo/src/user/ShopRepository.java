package com.example.demo.src.user;

import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.model.GetShopCountRes;
import com.example.demo.src.user.model.ShopInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    @Modifying
    @Query("SELECT s FROM Shop s ORDER BY RAND() ")
    List<Shop> findTop10();


    // 두점의 좌표의 거리를 구함
//    @Query(value = "SELECT *, (6371*acos(cos(radians(lat))*cos(radians(37.3252708))*cos(radians(126.9386927)-radians(lon))+sin(radians(lat))*sin(radians(37.3252708))))\n" +
//            "\t\t\tAS distance     \n" +
//            "             FROM SHOP s    \n" +
//            "             HAVING distance < 10\n" +
//            "             ORDER BY distance asc", nativeQuery = true)
//    Page<Shop> findAllBy(@Param("lat") Double lat,
//                         @Param("lon") Double lon,
//                         Pageable pageable);
//
//    ORDER BY "+HAVERSINE_PART+" DESC"
    final String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(s.lat)) *" +
            " cos(radians(s.lon) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(s.lat))))";

    @Query("SELECT s as shop, count(r.shop) as cnt \n" +
            "    from Shop s " +
            "    left join Review  r  " +
            "    on (s = r.shop ) " +
            "   WHERE " + HAVERSINE_PART + " < :distance "+
            "    group by  s.id " +
            "   order by count(r.shop) desc ")
    public Page<ShopInterface> findShopsByLocation(@Param("latitude") final double latitude,
                                                   @Param("longitude") final double longitude,
                                                   @Param("distance") final double distance,
                                                   Pageable pageable);



    Page<Shop> findAllByNumberAddressStartingWithAndNumberAddressContaining
            (String first, String second, Pageable pageable);

    Page<Shop> findAll(Pageable pageable);

}

//    final String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(m.lat)) *" +
//            " cos(radians(m.lon) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(m.lat))))";
//
//@Query("SELECT m  FROM Shop m WHERE " + HAVERSINE_PART + " < :distance  ORDER BY " + HAVERSINE_PART)