import { useSelector } from "react-redux";
import { useEffect } from "react";

import { MapDataAPI } from "../../api/MapDataAPI";

const SaveMapData = (props) => {
  const showURL = useSelector((state) => state.urlChange.name);

  useEffect(() => {
    // console.log(props.x);
    // console.log("size : " + props.size);
    // console.log("mapBounds : " + props.mapBounds);
    if (props._map === null || props.x === null || props.size === null) return;

    //상위 100개 데이터 불러오기
    // console.log("상위 100개 데이터 API 실행 시작");
    // console.log(props.setMapData);
    MapDataAPI(
      (data) => {
        props.setMapData(data);
      },
      props.x,
      props.y,
      props.mapBounds,
      showURL,
      1,
      100
    );
  }, [props.x, props.mapBounds]);
};

export default SaveMapData;
