import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MapDataAPI } from "../api/MapDataAPI";
import { RootState } from "../modules";
import { setMapData } from "../modules/saveData";

function useSaveMapData(xy: number[], size: null | number) {
  const _map = useSelector((state: any) => state.setMap._map);
  const showURL = useSelector((state: RootState) => state.urlChange.name);

  const dispatch = useDispatch();
  const SetMapData = useCallback(
    (data: RootState) => dispatch(setMapData(data)),
    [dispatch]
  );

  useEffect(() => {
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
    var radiusMath = parseInt(haversine(start, end, { unit: "meter" }) / 2500);
    if (radiusMath === 0) {
      radiusMath = 1;
    }

    //상위 100개 데이터 불러오기
    MapDataAPI(showURL, 1, 100, xy[1], xy[0], radiusMath, (data: RootState) => {
      SetMapData(data);
    });
  }, [xy, size, showURL]);
}

export default useSaveMapData;
