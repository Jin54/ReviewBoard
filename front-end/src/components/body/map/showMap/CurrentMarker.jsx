//=========현재 위치 마커 생성=======================================================================
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CurrentMarkerImg from "../../../../img/currentMarker.png";

const { kakao } = window;

const CurrentMarker = (props) => {
  const _map = useSelector((state) => state.setMap._map);
  const [currentMarker, setCurrentMarker] = useState(); //현재 위치

  useEffect(() => {
    if (_map == null) {
      return;
    }

    if (currentMarker != null) currentMarker.setMap(null);

    //현재 위치가 설정되어 있지 않을 때 실행
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        props.setXY([lon, lat]);
        props.setCurrentBtnOpen(true);

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        //마커 이미지 생성하기
        var imageSrc = CurrentMarkerImg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 50) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        function displayCurrentMarker(locPosition) {
          // 마커를 생성합니다
          var CurrentMarker = new kakao.maps.Marker({
            map: _map,
            position: locPosition,
            image: markerImage, // 마커이미지 설정
          });
          setCurrentMarker(CurrentMarker);

          CurrentMarker.setMap(_map);
        }
        // 마커를 표시합니다
        displayCurrentMarker(locPosition);
        return;
      });
    }
  }, [_map]);

  return;
};

export default CurrentMarker;
