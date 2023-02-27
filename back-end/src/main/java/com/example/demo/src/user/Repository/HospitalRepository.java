package com.example.demo.src.user.Repository;

import com.example.demo.src.user.entity.Hospital;
import com.example.demo.src.user.model.HospitalInterface;
import com.example.demo.src.user.model.ShopInterface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    final String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(s.lat)) *" +
            " cos(radians(s.lon) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(s.lat))))";

    @Query("SELECT s as hospital, count(r.hospital) as cnt \n" +
            "    from Hospital s " +
            "    left join ReviewHospital  r  " +
            "    on (s = r.hospital ) " +
            "   WHERE " + HAVERSINE_PART + " < :distance "+
            "    group by  s.id " +
            "   order by count(r.hospital) desc ")
    public Page<HospitalInterface> findHospitalsByLocation(@Param("latitude") final double latitude,
                                                           @Param("longitude") final double longitude,
                                                           @Param("distance") final double distance,
                                                           Pageable pageable);



    Page<Hospital> findAllByNumberAddressStartingWithAndNumberAddressContaining
            (String first, String second, Pageable pageable);

    Page<Hospital> findAll(Pageable pageable);

}

//    final String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(m.lat)) *" +
//            " cos(radians(m.lon) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(m.lat))))";
//
//@Query("SELECT m  FROM Hospital m WHERE " + HAVERSINE_PART + " < :distance  ORDER BY " + HAVERSINE_PART)