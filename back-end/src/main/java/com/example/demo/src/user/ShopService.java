package com.example.demo.src.user;


import com.example.demo.common.exceptions.BaseException;
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
import java.util.Optional;

import static com.example.demo.common.response.BaseResponseStatus.NOT_FIND_SHOP;
import static com.example.demo.common.response.BaseResponseStatus.NOT_FIND_USER;

// Service Create, Update, Delete 의 로직 처리
@Transactional
@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookMarkRepository bookMarkRepository;

    private final JwtService jwtService;

    private final ReviewImgRepository reviewImgRepository;
    //랜덤으로 음식점 출력
    @Transactional(readOnly = true)
    public List<GetShopRes> getShopRandom() {

        //랜덤으로 정렬함
        List<Shop> shopList = shopRepository.findTop10();

        //리턴할 리스트 객체선언
        List<GetShopRes> result = new ArrayList<>();
        //for문 순회하면서 GetShopRes형태로 담음
        for (Shop shop : shopList) {

            //리뷰 테이블에서 shop_id 와 같은 것을 카운트함
            Long reviewCounter =reviewRepository.countByShop(shop);

            //리뷰 테이블에서 shop_id 와 같은 row.rating 의 합을 나눠 평균을 구함

            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;

            //GetShopRes 형태 변환
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);

            //리턴 리스트에 담음
            result.add(getShopRes);

            //10개 이상 리턴안함
            //sql 구문에서 수정해야될부분 native query를 써야되나??
            if (result.size() > 10)
                break;

        }

        return result;
    }


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
            Double reviewRating = reviewRepository.sumRatingByShop(shopInterface.getShop()) / (double) reviewCounter;
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
        Page<Review> reviewList  = reviewRepository.findAllByShop(shop , pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetReviewRes> result = new ArrayList<>();
        for (Review review : reviewList) {

//            List<Review_img> reviewImgs=reviewImgRepository.findAllByReview(review);

            GetReviewRes getReviewRes = new GetReviewRes(review );

            result.add(getReviewRes);
        }

        return result;
    }

    public GetShopRes getShopInfo(Long shopId) {



        Shop shop  = shopRepository.findById(shopId).orElseThrow(() -> new BaseException(NOT_FIND_SHOP));;

        Long reviewCounter =reviewRepository.countByShop(shop);
        Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
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
            Long reviewCounter =reviewRepository.countByShop(shop);
            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
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
            Long reviewCounter =reviewRepository.countByShop(shop);
            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
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

        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserOrderByIdDesc(user);
        List<Long> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {
            result.add(bookmark.getShop().getId());
        }
        return result;
    }

    public List<GetShopRes> getShopBookMark() {

        Long jwtUserId = jwtService.getUserId();
        User user = userRepository.findById(jwtUserId).orElseThrow(() -> new BaseException(NOT_FIND_USER));


        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserOrderByIdDesc(user);
        List<GetShopRes> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {

            Shop shop =bookmark.getShop();

            Long reviewCounter =reviewRepository.countByShop(shop);
            Double reviewRating =reviewRepository.sumRatingByShop(shop) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(shop,reviewCounter,reviewRating);

            result.add(getShopRes);
        }
        return result;
    }

}
