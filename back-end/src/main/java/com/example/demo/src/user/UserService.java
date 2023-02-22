package com.example.demo.src.user;


import com.example.demo.common.exceptions.BaseException;
import com.example.demo.src.user.entity.Review;
import com.example.demo.src.user.entity.Shop;
import com.example.demo.src.user.entity.User;
import com.example.demo.src.user.model.GetReviewRes;
import com.example.demo.src.user.model.GetShopRes;
import com.example.demo.src.user.model.PostShopRes;

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
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public PostShopRes logIn(String[] info) {
        String kakaoEmail = info[0];
        String name= info[1];

        Optional<User>  user = userRepository.findByEmail(kakaoEmail);

        if(user.isPresent()){
            String jwtToken = jwtService.createJwt(user.get().getId());
            return new PostShopRes(user.get().getId(),jwtToken,user.get().getEmail(),name );
        }

        User saveUser = new User(kakaoEmail);
        userRepository.save(saveUser);
        String jwtToken = jwtService.createJwt(saveUser.getId());

        return new PostShopRes(saveUser.getId(),jwtToken,saveUser.getEmail(),name );

    }
    //랜덤으로 음식점 출력

//    public List<GetShopRes> getShopByCoord(int pageIndex, int pageSize, double lat, double lon,int distance) {
//
//        System.out.println(lat);
//        System.out.println(lon);
//
//        //paging 변수들 선언
//        Sort.Direction direction = Sort.Direction.DESC;
//        //name 기준으로 정렬함 (딱히필요하지않은데 필수 파라미터라서)
//        Sort sort = Sort.by(direction, "id");
//
//        //paing 할 인덱스 , 사이즈 선언
////        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize, page);
//        PageRequest pageable = PageRequest.of(pageIndex - 1, pageSize);
//
//        //lat,lon 가까운 음식점들 선택, (distance도 파라미터로 받아야할 필요성?)
//        Page<ShopInterface> shopList  = shopRepository.findShopsByLocation(lat, lon,distance,pageable);
//
//        ///for문 순회하면서 GetShopRes형태로 담음
//        List<GetShopRes> result = new ArrayList<>();
//        for (ShopInterface shopInterface : shopList) {
//            Long reviewCounter = shopInterface.getCnt();
//            Double reviewRating = reviewRepository.sumRatingByShop(shopInterface.getShop()) / (double) reviewCounter;
//            GetShopRes getShopRes = new GetShopRes(shopInterface.getShop(), reviewCounter, reviewRating);
//            result.add(getShopRes);
//        }
//
//        return result;
//    }




}
