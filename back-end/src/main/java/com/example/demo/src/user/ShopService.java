package com.example.demo.src.user;


import com.example.demo.common.exceptions.BaseException;
import com.example.demo.src.user.Repository.*;
import com.example.demo.src.user.entity.*;
import com.example.demo.src.user.model.*;
import com.example.demo.util.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.example.demo.common.response.BaseResponseStatus.NOT_FIND_SHOP;
import static com.example.demo.common.response.BaseResponseStatus.NOT_FIND_USER;

// Service Create, Update, Delete 의 로직 처리
@Transactional
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ReviewShopRepository reviewShopRepository;
    private final UserRepository userRepository;
    private final BookMarkRepository bookMarkRepository;

    private final JwtService jwtService;



    //좌표중심 탐색
    public List<GetShopRes> getShopByCoord(int pageIndex, int pageSize, double lat, double lon,int distance) {

        System.out.println(lat);
        System.out.println(lon);

        //paging 변수들 선언
        Sort.Direction direction = Sort.Direction.DESC;
        //name 기준으로 정렬함 (딱히필요하지않은데 필수 파라미터라서)
        Sort sort = Sort.by(direction, "id");

        //paing 할 인덱스 , 사이즈 선언
//        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, page);
        PageRequest pageable = PageRequest.of(pageIndex - 1, pageSize);

        //lat,lon 가까운 음식점들 선택, (distance도 파라미터로 받아야할 필요성?)
        Page<ShopInterface> shopList  = shopRepository.findShopsByLocation(lat, lon,distance,pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetShopRes> result = new ArrayList<>();
        for (ShopInterface shopInterface : shopList) {
            Long reviewCounter = shopInterface.getCnt();
            Double reviewRating = reviewShopRepository.sumRatingByShop(shopInterface.getShop()) / (double) reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shopInterface.getShop(), reviewCounter, reviewRating);
            result.add(getShopRes);
        }

        return result;
    }

    public List<GetReviewRes> getShopReview(int pageIndex, int pageSize,Long shopId) {

        //paging 변수들 선언
        Sort.Direction direction = Sort.Direction.DESC;
        //name 기준으로 정렬함 (딱히필요하지않은데 필수 파라미터라서)
        Sort sort = Sort.by(direction, "id");

        //paing 할 인덱스 , 사이즈 선언
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, sort);

        Shop shop=shopRepository.findById(shopId)
                .orElseThrow(() -> new BaseException(NOT_FIND_USER));;

        //lat,lon 가까운 음식점들 선택, (distance도 파라미터로 받아야할 필요성?)
        Page<ReviewShop> reviewList  = reviewShopRepository.findAllByShop(shop , pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetReviewRes> result = new ArrayList<>();
        for (ReviewShop reviewShop : reviewList) {

//            List<Review_img> reviewImgs=reviewImgRepository.findAllByReview(review);

            GetReviewRes getReviewRes = new GetReviewRes(reviewShop);

            result.add(getReviewRes);
        }

        return result;
    }

    public GetShopRes getShopInfo(Long shopId) {



        Shop shop  = shopRepository.findById(shopId).orElseThrow(() -> new BaseException(NOT_FIND_SHOP));;

        Long reviewCounter = reviewShopRepository.countByShop(shop);
        Double reviewRating = reviewShopRepository.sumRatingByShop(shop) /  (double)reviewCounter;
        GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);


        return getShopRes;
    }

    public List<GetShopRes> getShopByAddress(int pageIndex, int pageSize, String first, String second) {
        //paging 변수들 선언
        Sort.Direction direction = Sort.Direction.DESC;
        //name 기준으로 정렬함 (딱히필요하지않은데 필수 파라미터라서)
        Sort sort = Sort.by(direction, "id");

        //paing 할 인덱스 , 사이즈 선언
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, sort);

        //lat,lon 가까운 음식점들 선택, (distance도 파라미터로 받아야할 필요성?)
        Page<Shop> shopList  = shopRepository.findAllByNumberAddressStartingWithAndNumberAddressContaining
                (first,second, pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetShopRes> result = new ArrayList<>();
        for (Shop shop : shopList) {
            Long reviewCounter = reviewShopRepository.countByShop(shop);
            Double reviewRating = reviewShopRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);
            result.add(getShopRes);
        }

        return result;

    }

    public List<GetShopRes> getShopAll(int pageIndex, int pageSize) {
        //paging 변수들 선언
        Sort.Direction direction = Sort.Direction.ASC;
        //name 기준으로 정렬함 (딱히필요하지않은데 필수 파라미터라서)
        Sort sort = Sort.by(direction, "id");

        //paing 할 인덱스 , 사이즈 선언
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, sort);
        Page<Shop> shopList  = shopRepository.findAll(pageable);
        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetShopRes> result = new ArrayList<>();
        for (Shop shop : shopList) {
            Long reviewCounter = reviewShopRepository.countByShop(shop);
            Double reviewRating = reviewShopRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);
            result.add(getShopRes);
        }

        return result;
    }


    public List<Long> setShopBookMark(Long shopId) {

        Long jwtUserId = jwtService.getUserId();
        User user = userRepository.findById(jwtUserId).orElseThrow(() -> new BaseException(NOT_FIND_USER));
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new BaseException(NOT_FIND_SHOP));

        long numOfEntriesDeleted = bookMarkRepository.deleteByUserAndShop(user,shop);

        System.out.println(numOfEntriesDeleted);
        if(numOfEntriesDeleted == 0 ) {
            bookMarkRepository.save(new Bookmark(user, shop));
        }

        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserAndShopNotNullOrderByIdDesc(user);
        List<Long> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {
            result.add(bookmark.getShop().getId());
        }
        return result;
    }

    public List<GetShopRes> getShopBookMark() {

        Long jwtUserId = jwtService.getUserId();
        User user = userRepository.findById(jwtUserId).orElseThrow(() -> new BaseException(NOT_FIND_USER));


        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserAndShopNotNullOrderByIdDesc(user);
        List<GetShopRes> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {

            Shop shop =bookmark.getShop();

            Long reviewCounter = reviewShopRepository.countByShop(shop);
            Double reviewRating = reviewShopRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);

            result.add(getShopRes);
        }
        return result;
    }

}
