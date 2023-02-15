package com.example.demo.src.user;

import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Review_img;
import com.example.demo.src.user.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ReviewImgRepository extends JpaRepository<Review_img, Long> {

    List<Review_img> findAllByReview(Review review);
}
