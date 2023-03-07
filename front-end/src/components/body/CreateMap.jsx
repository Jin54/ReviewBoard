//=========맵 생성=========================
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { saveMap } from "../../modules/setMap";

const { kakao } = window;

/**
 * FIXME - 컴포넌트를 리턴하는 컴포넌트가 아닌 것 같아요.
 *   id가 map인 element에 카카오 지도를 로드하는 함수인 것 같아요.
 *   custom hook과 ref로 처리해보면 어떨까요?
 *   custom hook에서 Map 컴포넌트의 KakaoMap 엘레멘트를 ref로 처리해주면 어떨까요?
 */
const CreateMap = () => {
  //맵 저장
  const dispatch = useDispatch();
  const SaveMap = useCallback((map) => dispatch(saveMap(map)), [dispatch]);

  useEffect(() => {
    /*
     * FIXME - === 연산자를 사용해주세요
     *  document.getElementById("map") === null
     *  if (!document.getElementById("map")) return;
     */
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
};

export default CreateMap;
