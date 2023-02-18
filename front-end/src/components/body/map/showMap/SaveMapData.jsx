import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MapDataAPI } from "../../../../api/MapDataAPI";
import { setMapData } from "../../../../modules/saveData";

const SaveMapData = (props) => {
  const showURL = useSelector((state) => state.urlChange.name);
  const _map = useSelector((state) => state.setMap._map);

  const dispatch = useDispatch();
  const SetMapData = useCallback(
    (map) => dispatch(setMapData(map)),
    [dispatch]
  );

  useEffect(() => {
    if (_map == null) {
      console.log("맵 없음");
      return;
    }
    // 줌 변화 시, 맵 반경 변화
    //지도의 범위 적용하기

    var bounds = _map.getBounds();
    const haversine = require("haversine");
    const start = {
      latitude: bounds.qa,
      longitude: bounds.ha,
    };
    const end = {
      latitude: bounds.pa,
      longitude: bounds.oa,
    };
    var radiusMath = parseInt(haversine(start, end, { unit: "meter" }) / 2000);
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
  }, [props.xy, props.size]);
};

export default SaveMapData;
