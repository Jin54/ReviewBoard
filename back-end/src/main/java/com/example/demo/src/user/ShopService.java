package com.example.demo.src.user;



import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.model.*;
import lombok.RequiredArgsConstructor;
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

    @Transactional(readOnly = true)
    public List<GetShopRes> getShopRandom() {
      List<Shop> shopList = shopRepository.findTop10();

        List<GetShopRes> result = new ArrayList<>();
        for (Shop shop : shopList) {
            GetShopRes getShopRes = new GetShopRes(shop);
            result.add(getShopRes);
            if(result.size()>10)
                break;;
        }

        return result;
    }



}
