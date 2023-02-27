package com.example.demo.src.user.Repository;

import com.example.demo.src.user.entity.Hospital;
import com.example.demo.src.user.entity.ReviewHospital;
import com.example.demo.src.user.entity.ReviewHospital;
import com.example.demo.src.user.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewHospitalRepository extends JpaRepository<ReviewHospital, Long> {
    //shop_id 와같은것을 카운트함
    Long countByHospital(Hospital hospital);


    //shop_id 와 같은 로우의 raiting을 총합을 구하고 null값이면 0을 반환함
    @Query("SELECT COALESCE(sum(r.rating),0)  from ReviewHospital r where r.hospital=:shop_id")
    Double sumRatingByHospital(@Param("shop_id") Hospital hospital);


    @Query("SELECT r from ReviewHospital r  where r.hospital=:shop_id order by r.id asc ,LENGTH(r.content) desc ")
    Page<ReviewHospital> findAllByHospital(@Param("shop_id")Hospital hospital, Pageable pageable);
}
