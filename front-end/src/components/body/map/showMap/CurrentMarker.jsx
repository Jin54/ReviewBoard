//=========현재 위치 마커 생성=======================================================================
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CurrentMarkerImg from "../../../../img/currentMarker.png";

const { kakao } = window;

/**
 * FIXME - 엘레멘트를 리턴하는 컴포넌트가 아닌 것 같아요.
 *   id가 map인 element에 카카오 지도에 현재 위치를 마커로 표시하는 함수인 것 같아요.
 *   custom hook과 ref로 처리해보면 어떨까요?
 *   custom hook에서 위치를 조회하고 Map 컴포넌트의 KakaoMap 엘레멘트 Ref로 마커를 표시하면 어떨까요?
 */
const CurrentMarker = (props) => {
  const _map = useSelector((state) => state.setMap._map);
  const [currentMarker, setCurrentMarker] = useState(); //현재 위치

  useEffect(() => {
    /*
     * FIXME - 비교 연산자를 사용할 때 엄격한 비교 연산자를 사용해주세요.
     *  if (_map === null)
     *  if (!_map)
     */
    if (_map == null) {
      return;
    }

    /*
     * FIXME - 비교 연산자를 사용할 때 엄격한 비교 연산자를 사용해주세요.
     *  if (currentMarker !== null)
     *  if (currentMarker) {
     *    currentMarker.setMap(null);
     *  }
     */
    if (currentMarker != null) currentMarker.setMap(null);

    /*
     * FIXME - navigator.geolocation이 없을 때 early return 시켜버리면 조금 더 가독성이 좋아질거에요.
     *   if(!navigator.geolocation) {
     *     return;
     *   }
     *   // navigator.geolocation이 있을 때 실행할 로직 작성
     */
    //현재 위치가 설정되어 있지 않을 때 실행
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         *  const {latitude: lat, longitude: lon} = position.coords;
         */
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        props.setXY([lon, lat]);
        props.setCurrentBtnOpen(true);

        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        //마커 이미지 생성하기
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var imageSrc = CurrentMarkerImg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 50) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        /*
         * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
         */
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        /*
         * FIXME - 콜백함수 안에 함수가 하나 더 선언되어 있어서 가독성이 떨어지는 것 같아요.
         *  displayCurrentMarker() 함수는 콜백함수 밖에 선언하고 사용해도 좋을 것 같아요.
         */
        function displayCurrentMarker(locPosition) {
          // 마커를 생성합니다
          /*
           * FIXME - 블록 레벨 스코프를 가지는 let, const를 사용해주세요.
           */
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
      props.setXY([126.97645631375248, 37.566976954478896]);
    }
  }, [_map]);

  return;
};

export default CurrentMarker;
