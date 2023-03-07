//마우스 드래그/줌 변화 할 때마다 실행
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { kakao } = window;

/**
 * FIXME - 엘레멘트를 리턴하는 컴포넌트가 아닌 것 같아요.
 *   kakao map의 dragend, zoom_changed 이벤트를 설정하는 함수 같아요.
 *   CreateMap.jsx에 작성해드린 주석처럼 KakaoMap 초키화하는 custom hook에서 이벤트 등록해주면 좋을 것 같아요.
 */
const MapEvent = (props) => {
  const _map = useSelector((state) => state.setMap._map);

  useEffect(() => {
    if (_map == null) return;

    kakao.maps.event.addListener(_map, "dragend", function () {
      props.setXY([_map.getCenter().La, _map.getCenter().Ma]);
    });

    kakao.maps.event.addListener(_map, "zoom_changed", function () {
      props.setXY([_map.getCenter().La, _map.getCenter().Ma]);
      props.setSize(_map.getLevel());
    });
  }, [_map]);
};

export default MapEvent;
