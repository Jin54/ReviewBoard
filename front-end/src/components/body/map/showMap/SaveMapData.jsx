import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MapDataAPI } from "../../../../api/MapDataAPI";
import { setMapData } from "../../../../modules/saveData";

/**
 * FIXME - 엘레멘트를 리턴하는 컴포넌트가 아닌 것 같아요.
 *   kakao map의 지도 상태가 변경되었을 때 데이터를 업데이트 해주는 함수인 것 같아요.
 *   CreateMap.jsx에 작성해드린 주석처럼 custom hook으로 만들어서 처리해주세요.
 */
const SaveMapData = (props) => {
  const _map = useSelector((state) => state.setMap._map);
  const showURL = useSelector((state) => state.urlChange.name);

  const dispatch = useDispatch();
  const SetMapData = useCallback(
    (data) => dispatch(setMapData(data)),
    [dispatch]
  );

  useEffect(() => {
    /*
     * FIXME - === 연산자를 사용해주세요
     *  if (!_map) return;
     *  if (_map === null) return;
     */
    if (_map == null) {
      return;
    }
    // 줌 변화 시, 맵 반경 변화
    //지도의 범위 적용하기

    const bounds = _map.getBounds();
    const haversine = require("haversine");
    const start = {
      latitude: bounds.qa,
      longitude: bounds.ha,
    };
    const end = {
      latitude: bounds.pa,
      longitude: bounds.oa,
    };
    /*
     * FIXME - 블록 레벨 스코프 변수를 사용해주세요
     *  const radiusMath = parseInt(haversine(start, end, { unit: "meter" }) / 2500);
     */
    var radiusMath = parseInt(haversine(start, end, { unit: "meter" }) / 2500);
    if (radiusMath === 0) {
      radiusMath = 1;
    }

    //상위 100개 데이터 불러오기
    MapDataAPI(
      showURL,
      1,
      100,
      props.xy[1],
      props.xy[0],
      radiusMath,
      (data) => {
        SetMapData(data);
      }
    );
  }, [props.xy, props.size, showURL]);
};

export default SaveMapData;
