import React, { useCallback } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const Map = (props) => {
  useEffect(() => {
    //========카카오 맵 api 설정&생성========================================================================
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36, 127.9), //지도의 중심좌표. 필수값
      level: props.size, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //=========현재 위치 마커 생성=======================================================================

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

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

    //=========주소로 장소 표시하기=======================================================================
    //주소-좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();
    //주소로 좌표 검색
    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          marker.setMap(map);

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          // var infowindow = new kakao.maps.InfoWindow({
          //   content:
          //     '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          // });
          // infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          // map.setCenter(coords);
        }
      }
    );
  }, [props.size]);

  return <KaKaoMap id="map"></KaKaoMap>;
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
