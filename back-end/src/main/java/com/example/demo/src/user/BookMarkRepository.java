package com.example.demo.src.user;

import com.example.demo.src.user.entity.Bookmark;
import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.entity.User;

import com.example.demo.src.user.model.BookmarkInterface;
import com.example.demo.src.user.model.ShopInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByUserOrderByIdDesc(User user);

    Long deleteByUserAndShop(User user,Shop shop);
}
