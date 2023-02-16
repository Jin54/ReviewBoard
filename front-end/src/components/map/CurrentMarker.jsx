//=========현재 위치 마커 생성=======================================================================

import { useEffect } from "react";

const { kakao } = window;

const CurrentMarker = (props) => {
  useEffect(() => {
    // console.log("_map이 바뀔 때, 현재 마커 생성 시작");
    if (props._map === null) {
      // console.log("_map 값이 비어있습니다.");
      return;
    }

    //현재 위치가 설정되어 있지 않을 때 실행
    // console.log("현재 위치 마커 생성 시작");
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // console.log("현재 좌표 변경 시작");
        // console.log(lat);
        // console.log(lon);
        props.setCurrentX(lat);
        props.setCurrentY(lon);

        //시작할 때, 현재 위치를 중심 좌표로 설정
        props.setX(lat);
        props.setY(lon);

        // console.log("현재 위치 : 사이즈 변경 시작");
        props.setSize(11);
        // 마커와 인포윈도우를 표시합니다
        displayCurrentMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      var locPosition = new kakao.maps.LatLng(props.currentX, props.currentY),
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
        map: props._map,
        position: locPosition,
        image: markerImage, // 마커이미지 설정
      });
      CurrentMarker.setMap(props._map);
    }

    return displayCurrentMarker();
  }, [props._map]);
};

export default CurrentMarker;
