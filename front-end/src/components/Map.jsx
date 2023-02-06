import React, { useCallback } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import dummy from "./../db/restaurant.json";
import "../style/map.scss";
import { resetxy } from "../modules/map";
import { saveLocation } from "../modules/location";
import { useDispatch, useSelector } from "react-redux";

const { kakao } = window;

const Map = (props) => {
  //중심 좌표 설정 (현재 위치 기준)
  const x = useSelector((state) => state.map.x);
  const y = useSelector((state) => state.map.y);
  const dispatch = useDispatch();
  const resetXY = useCallback((x, y) => dispatch(resetxy(x, y)), [dispatch]);

  //=========지역 선택 후, 해당 지역의 맛집만 표시=======================================================================
  const bigLocation = useSelector((state) => state.location.bigLocation);
  const smallLocation = useSelector((state) => state.location.smallLocation);

  useEffect(() => {
    //========카카오 맵 api 설정&생성========================================================================
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표. 필수값
      level: props.size, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //=========현재 위치 마커 생성=======================================================================

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        resetXY(lat, lon);

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 마커와 인포윈도우를 표시합니다
        displayCurrentMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayCurrentMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    //마커 이미지 생성하기
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(32, 34.5), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    function displayCurrentMarker(locPosition, message) {
      // 마커를 생성합니다
      var CurrentMarker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage, // 마커이미지 설정
      });
      CurrentMarker.setMap(map);
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
    //마커를 지도 위에 표시

    //=========dummy 데이터에서 주소를 가져온 후, 주소로 여러 장소 표시하기 & 지역 선택 후, 해당 지역의 맛집 모두 표시하기=======================================================================
    //주소-좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();
    const searchLocation = dummy.restaurants.filter(
      (restaurant) =>
        -1 !== restaurant.add.search(bigLocation) &&
        -1 !== restaurant.add.search(smallLocation)
    );

    //주소로 좌표 검색
    const showRestaurant = searchLocation.map((restaurant) => {
      geocoder.addressSearch(restaurant.add, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          //=============마커의 오버레이(클릭 시 보여지는 css)========================================================

          var content = document.createElement("div");
          content.className = "wrap";

          var contentHeader = document.createElement("div");
          contentHeader.className = "header";
          content.appendChild(contentHeader);

          var HeaderTitle = document.createElement("p");
          HeaderTitle.innerHTML = restaurant.title;
          contentHeader.appendChild(HeaderTitle);

          var HeaderCloseBtn = document.createElement("div");
          HeaderCloseBtn.className = "closeimgWrap";
          HeaderCloseBtn.innerHTML =
            '<img src="https://i.postimg.cc/ZYjNRKj6/close-white.png"></img>';
          HeaderCloseBtn.onclick = function () {
            overlay.setMap(null);
          };
          contentHeader.appendChild(HeaderCloseBtn);

          var infowrap = document.createElement("div");
          infowrap.className = "infowrap";
          infowrap.innerHTML =
            '<div class="imgwrap">' +
            "<img src={" +
            process.env.PUBLIC_URL +
            "/img/ex01.png}></img>" +
            "</div>" +
            '<div class="info">' +
            '<p class="address">' +
            restaurant.add +
            "</p>" +
            '<p class="scope">' +
            restaurant.scope +
            "</p>" +
            '<p class="review">리뷰 100개</p>' +
            "</div>";
          content.appendChild(infowrap);

          // 마커 위에 커스텀오버레이를 표시합니다
          // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
          const overlay = new kakao.maps.CustomOverlay({
            content: content,
            position: marker.getPosition(),
          });

          // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
          });

          // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
          function closeOverlay() {
            overlay.setMap(null);
          }
        }
      });
    });
  }, [props.size]);

  return <KaKaoMap id="map"></KaKaoMap>;
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
