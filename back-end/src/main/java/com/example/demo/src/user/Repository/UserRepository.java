package com.example.demo.src.user.Repository;

import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}

//    final String HAVERSINE_PART = "(6371 * acos(cos(radians(:latitude)) * cos(radians(m.lat)) *" +
//            " cos(radians(m.lon) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(m.lat))))";
//
//@Query("SELECT m  FROM Shop m WHERE " + HAVERSINE_PART + " < :distance  ORDER BY " + HAVERSINE_PART)