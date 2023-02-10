import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ImgComponent from "./../ImageComponent";
import { resetxy, changeSize, currentxy } from "../../modules/map";
import { MapRamdomAPI } from "./../../api/MapRamdom";
import { CenterRestaurantAPI } from "./../../api/CenterRestaurant";
import "../../style/map.scss";

const { kakao } = window;

const CreateMap = (props) => {
  const x = useSelector((state) => state.map.x);
  const y = useSelector((state) => state.map.y);
  const currentX = useSelector((state) => state.map.currentX);
  const currentY = useSelector((state) => state.map.currentY);
  const size = useSelector((state) => state.map.number);
  const bigLocation = useSelector((state) => state.location.bigLocation);
  const smallLocation = useSelector((state) => state.location.smallLocation);
  const dispatch = useDispatch();
  const resetXY = useCallback((x, y) => dispatch(resetxy(x, y)), [dispatch]);
  const currentXY = useCallback(
    (x, y) => dispatch(currentxy(x, y)),
    [dispatch]
  );
  const ChangeSize = useCallback(
    (number) => dispatch(changeSize(number)),
    [dispatch]
  );
  const [_map, setMap] = useState(null);

  //랜덤 값 저장
  const [randomData, setRandomData] = useState(null);
  useEffect(() => {
    MapRamdomAPI((data) => {
      setRandomData(data);
    });
  }, []);

  //=========맵 생성=======================================================================
  useEffect(() => {
    //랜덤 10개 받아오기 전일 때
    if (randomData === null) {
      const mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
          level: size, // 지도의 확대 레벨
        };

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);
      return;
    }

    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
        level: size, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    //=========현재 위치 마커 생성=======================================================================
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        currentXY(lat, lon);

        // 마커와 인포윈도우를 표시합니다
        displayCurrentMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(x, y),
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
    function displayCurrentMarker(locPosition) {
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

    setMap(map);
  }, [randomData]);

  useEffect(() => {
    if (_map === null) return;
    //=========랜덤 10개 보여주기=======================================================================
    var geocoder = new kakao.maps.services.Geocoder();
    const showRestaurant = randomData.map((restaurant) => {
      geocoder.addressSearch(
        restaurant.numberAddress,
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map: _map,
              position: coords,
            });

            //=============마커의 오버레이(클릭 시 보여지는 css)========================================================
            var content = document.createElement("div");
            content.className = "wrap";

            var contentHeader = document.createElement("div");
            contentHeader.className = "header";
            content.appendChild(contentHeader);

            var HeaderTitle = document.createElement("p");
            HeaderTitle.innerHTML = restaurant.name;
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
              restaurant.numberAddress +
              "</p>" +
              '<p class="scope">리뷰 ' +
              restaurant.review_rating +
              "점</p>" +
              '<p class="review"> 리뷰' +
              restaurant.review_number +
              "개</p>" +
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
              overlay.setMap(_map);
            });
          }
        }
      );
    });
  }, [_map]);

  //지도 줌 인&줌 아웃
  //https://leedaeho1188.tistory.com/51
  const zoomIn = () => {
    ChangeSize(_map.getLevel() - 1);
    _map.setLevel(_map.getLevel() - 1);
  };

  const zoomOut = () => {
    ChangeSize(_map.getLevel() + 1);
    _map.setLevel(_map.getLevel() + 1);
  };

  //현재 위치로 부드럽게 이동시키기
  const panTo = () => {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(currentX, currentY);
    //현재 위치 버튼 클릭 시 줌 인
    ChangeSize(4);
    _map.setLevel(4);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    _map.panTo(moveLatLon);
  };

  // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  const [centerData, setCenterData] = useState(null);

  if (_map != null) {
    kakao.maps.event.addListener(_map, "dragend", function () {
      // 지도 중심좌표를 얻어옵니다
      var latlng = _map.getCenter();
      resetXY(latlng.getLat(), latlng.getLng());
    });
  }

  //=========위치가 바뀔 때마다 주변 음식점 8개 보이기=====================================================
  useEffect(() => {
    if (_map === null) return;
    CenterRestaurantAPI(
      (data) => {
        setCenterData(data);
      },
      x,
      y
    );
    // console.log(centerData);
  }, [x, y, size]);

  useEffect(() => {
    if (centerData === null) return;

    const showCenterRestaurant = centerData.map((restaurant) => {
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const coords = new kakao.maps.LatLng(restaurant.lat, restaurant.lon);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: _map, // 마커를 표시할 지도
        position: coords, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      //=============마커의 오버레이(클릭 시 보여지는 css)========================================================
      var content = document.createElement("div");
      content.className = "wrap";

      var contentHeader = document.createElement("div");
      contentHeader.className = "header";
      content.appendChild(contentHeader);

      var HeaderTitle = document.createElement("p");
      HeaderTitle.innerHTML = restaurant.name;
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
        restaurant.numberAddress +
        "</p>" +
        '<p class="scope">리뷰 ' +
        restaurant.review_rating +
        "점</p>" +
        '<p class="review"> 리뷰' +
        restaurant.review_number +
        "개</p>" +
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
        overlay.setMap(_map);
      });
    });
  }, [centerData]);

  //============지역 선택 시, 중심 좌표 이동 및 맵 이동=======================================================================
  useEffect(() => {
    if (_map === null) return;

    var geocoder = new kakao.maps.services.Geocoder();
    const location = bigLocation + " " + smallLocation;
    geocoder.addressSearch(location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        _map.setCenter(coords);
        resetXY(result[0].y, result[0].x);
        ChangeSize(4);
      }
    });
  }, [bigLocation, smallLocation, _map]);

  return (
    <>
      <KaKaoMap id="map"></KaKaoMap>
      <MapBtns>
        <MapBtnsLeft>
          <SelectRegion onClick={props.openRegion}>지역 선택</SelectRegion>
          <Location top="120" onClick={panTo}>
            <ImgComponent src={"gps.png"} width={"100%"} />
          </Location>
        </MapBtnsLeft>
        <MapBtnsRight>
          <MapSize top="0" onClick={zoomIn}>
            <ImgComponent src={"plus.png"} width={"100%"} />
          </MapSize>
          <MapSize top="120" onClick={zoomOut}>
            <ImgComponent src={"minus.png"} width={"100%"} />
          </MapSize>
        </MapBtnsRight>
      </MapBtns>
    </>
  );
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

const MapBtns = styled.div`
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  top: 7%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BtnStyle = styled.div`
  background: #16312c;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;
const MapBtnsLeft = styled.div``;
const MapBtnsRight = styled.div``;
const SelectRegion = styled(BtnStyle)``;
const Location = styled(BtnStyle)`
  width: 20px;
  margin-top: 10px;
`;
const MapSize = styled(BtnStyle)`
  width: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export default CreateMap;
