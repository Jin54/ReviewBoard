import { useEffect } from "react";

//마우스 드래그/줌 변화 할 때마다 실행
const { kakao } = window;

const MapEvent = (props) => {
  useEffect(() => {
    if (props._map === null) return;

    // console.log(props._map);

    kakao.maps.event.addListener(props._map, "dragend", function () {
      //   console.log("마우스 드래그");
      // 지도 중심좌표를 얻어옵니다
      var latlng = props._map.getCenter();
      props.setX(latlng.getLat());
      props.setY(latlng.getLng());
    });

    //확대, 축소 시 드래그 이벤트와 같은 함수 실행
    kakao.maps.event.addListener(props._map, "zoom_changed", function () {
      //   console.log("줌 변화");
      props.setSize(props._map.getLevel());
      //   console.log("사이즈 변경  : " + props.size);
    });
  }, [props._map]);
};

export default MapEvent;
