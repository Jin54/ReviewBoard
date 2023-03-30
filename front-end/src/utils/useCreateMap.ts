//맵 생성
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { saveMap } from "../modules/setMap";

const { kakao } = window;

function useCreateMap() {
  //맵 저장
  const dispatch = useDispatch();
  const SaveMap = useCallback(
    (map: object) => dispatch(saveMap(map)),
    [dispatch]
  );

  useEffect(() => {
    if (document.getElementById("map") == null) return;

    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.715133, 126.734086), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);
    map.setMaxLevel(13); //맵의 최대 축소 크기
    map.setMinLevel(3); //맵의 최소 확대 크기

    SaveMap(map);
  }, []);
}

export default useCreateMap;
