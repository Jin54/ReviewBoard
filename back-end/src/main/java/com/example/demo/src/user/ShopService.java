package com.example.demo.src.user;


import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

// Service Create, Update, Delete 의 로직 처리
@Transactional
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ReviewRepository reviewRepository;
    @Transactional(readOnly = true)
    public List<GetShopRes> getShopRandom() {
        List<Shop> shopList = shopRepository.findTop10();

        List<GetShopRes> result = new ArrayList<>();
        for (Shop shop : shopList) {
            Long reviewCounter =reviewRepository.countByShop(shop);
            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);
            result.add(getShopRes);
            if (result.size() > 10)
                break;

        }

        return result;
    }


    public List<GetShopRes> getShopByCoord(int pageIndex, int pageSize, Double lat, Double lon) {


        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "name");
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, sort);
        Page<Shop> shopList  = shopRepository.findAllBy(lat, lon,pageable);


        List<GetShopRes> result = new ArrayList<>();

        for (Shop shop : shopList) {
            Long reviewCounter =reviewRepository.countByShop(shop);
            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);
            result.add(getShopRes);
        }

        return result;

    }
}
