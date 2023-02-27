package com.example.demo.src.user.Repository;

import com.example.demo.src.user.entity.Bookmark;
import com.example.demo.src.user.entity.Hospital;
import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookMarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByUserAndShopNotNullOrderByIdDesc(User user);
    List<Bookmark> findAllByUserAndHospitalNotNullOrderByIdDesc(User user);
    Long deleteByUserAndShop(User user,Shop shop);

    Long deleteByUserAndHospital(User user, Hospital hospital);
}
