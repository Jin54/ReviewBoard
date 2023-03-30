//마우스 드래그/줌 변화 할 때마다 실행
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { kakao } = window;

function useMapEvent(setXY: Function, setSize: Function) {
  const _map = useSelector((state: any) => state.setMap._map);
  // type을 any로 한 이유
  // RootState로 해도 rootReducer에는 _map.getCenter() 객체가 존재하지 않는다.
  // _map은 kakao에서 받아오는 것이기 때문에 그냥 any로 한다.

  useEffect(() => {
    if (_map == null) return;

    kakao.maps.event.addListener(_map, "dragend", function () {
      setXY([_map.getCenter().La, _map.getCenter().Ma]);
    });

    kakao.maps.event.addListener(_map, "zoom_changed", function () {
      setXY([_map.getCenter().La, _map.getCenter().Ma]);
      setSize(_map.getLevel());
    });
  }, [_map]);
}

export default useMapEvent;
