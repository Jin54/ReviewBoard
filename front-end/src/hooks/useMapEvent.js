//마우스 드래그/줌 변화 할 때마다 실행
import { useEffect } from "react";
import { useSelector } from "react-redux";

const { kakao } = window;

function useMapEvent(setXY, setSize) {
  const _map = useSelector((state) => state.setMap._map);

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
