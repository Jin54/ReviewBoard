package com.example.demo.src.user;


import com.example.demo.common.exceptions.BaseException;
import com.example.demo.src.user.Repository.*;
import com.example.demo.src.user.entity.*;
import com.example.demo.src.user.model.GetReviewRes;
import com.example.demo.src.user.model.GetShopRes;
import com.example.demo.src.user.model.HospitalInterface;
import com.example.demo.src.user.model.ShopInterface;
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
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final ReviewHospitalRepository reviewHospitalRepository;
    private final UserRepository userRepository;
    private final BookMarkRepository bookMarkRepository;

    private final JwtService jwtService;


    //좌표중심 탐색
    public List<GetShopRes> getShopByCoord(int pageIndex, int pageSize, double lat, double lon,int distance) {


        PageRequest pageable = PageRequest.of(pageIndex - 1, pageSize);
        Page<HospitalInterface> shopList  = hospitalRepository.findHospitalsByLocation(lat, lon,distance,pageable);

        List<GetShopRes> result = new ArrayList<>();
        for (HospitalInterface hospitalInterface : shopList) {

            Hospital hospital =hospitalInterface.getHospital();
            Long reviewCounter = hospitalInterface.getCnt();

            Double reviewRating = reviewHospitalRepository.sumRatingByHospital(hospital) / (double) reviewCounter;
            GetShopRes getShopRes = new GetShopRes(hospital, reviewCounter, reviewRating);
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

        Hospital hospital=hospitalRepository.findById(shopId)
                .orElseThrow(() -> new BaseException(NOT_FIND_USER));;

        //lat,lon 가까운 음식점들 선택, (distance도 파라미터로 받아야할 필요성?)
        Page<ReviewHospital> reviewList  = reviewHospitalRepository.findAllByHospital(hospital , pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetReviewRes> result = new ArrayList<>();
        for (ReviewHospital reviewHospital : reviewList) {
            GetReviewRes getReviewRes = new GetReviewRes(reviewHospital);
            result.add(getReviewRes);
        }

        return result;
    }

    public GetShopRes getShopInfo(Long shopId) {

        Hospital hospital  = hospitalRepository.findById(shopId).orElseThrow(() -> new BaseException(NOT_FIND_SHOP));;

        Long reviewCounter =reviewHospitalRepository.countByHospital(hospital);
        Double reviewRating =reviewHospitalRepository.sumRatingByHospital(hospital) /  (double)reviewCounter;
        GetShopRes getShopRes = new GetShopRes(hospital,reviewCounter,reviewRating);

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
        Page<Hospital> shopList  = hospitalRepository.findAllByNumberAddressStartingWithAndNumberAddressContaining
                (first,second, pageable);

        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetShopRes> result = new ArrayList<>();
        for (Hospital hospital : shopList) {
            Long reviewCounter =reviewHospitalRepository.countByHospital(hospital);
            Double reviewRating =reviewHospitalRepository.sumRatingByHospital(hospital) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(hospital,reviewCounter,reviewRating);
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
        Page<Hospital> shopList  = hospitalRepository.findAll(pageable);
        ///for문 순회하면서 GetShopRes형태로 담음
        List<GetShopRes> result = new ArrayList<>();
        for (Hospital hospital : shopList) {
            Long reviewCounter =reviewHospitalRepository.countByHospital(hospital);
            Double reviewRating =reviewHospitalRepository.sumRatingByHospital(hospital) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(hospital,reviewCounter,reviewRating);
            result.add(getShopRes);
        }

        return result;
    }


    public List<Long> setShopBookMark(Long shopId) {

        Long jwtUserId = jwtService.getUserId();
        User user = userRepository.findById(jwtUserId).orElseThrow(() -> new BaseException(NOT_FIND_USER));
        Hospital hospital = hospitalRepository.findById(shopId).orElseThrow(() -> new BaseException(NOT_FIND_SHOP));

        long numOfEntriesDeleted = bookMarkRepository.deleteByUserAndHospital(user,hospital);

        if(numOfEntriesDeleted == 0 ) {
            bookMarkRepository.save(new Bookmark(user, hospital));
        }

        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserAndHospitalNotNullOrderByIdDesc(user);
        List<Long> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {
            result.add(bookmark.getHospital().getId());
        }
        return result;
    }

    public List<GetShopRes> getShopBookMark() {

        Long jwtUserId = jwtService.getUserId();
        User user = userRepository.findById(jwtUserId).orElseThrow(() -> new BaseException(NOT_FIND_USER));


        List<Bookmark> bookMarkList =  bookMarkRepository.findAllByUserAndHospitalNotNullOrderByIdDesc(user);
        List<GetShopRes> result = new ArrayList<>();
        for (Bookmark bookmark : bookMarkList) {

            Hospital hospital =bookmark.getHospital();

            Long reviewCounter =reviewHospitalRepository.countByHospital(hospital);
            Double reviewRating =reviewHospitalRepository.sumRatingByHospital(hospital) /  (double)reviewCounter;
            GetShopRes getShopRes = new GetShopRes(hospital,reviewCounter,reviewRating);

            result.add(getShopRes);
        }
        return result;
    }

}
