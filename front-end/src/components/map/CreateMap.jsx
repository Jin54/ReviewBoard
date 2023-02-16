//=========맵 생성=========================
import { useEffect, useState } from "react";
import styled from "styled-components";

import CurrentMarker from "./CurrentMarker";
import MapEvent from "./MapEvent";
import SaveMapData from "./SaveMapData";
import SearchLocation from "../location/SearchLocation";
import ShowMarker from "./ShowMarker";

const { kakao } = window;

const CreateMap = (props) => {
  const [_map, setMap] = useState(null); //지도 정보
  const [x, setX] = useState(null); //지도의 중심 좌표 위도 lat
  const [y, setY] = useState(null); //지도의 중심 좌표 경도 lon
  const [currentX, setCurrentX] = useState(null); //현재 위치의 위도 lat
  const [currentY, setCurrentY] = useState(null); //현재 위치의 경도 lon
  const [size, setSize] = useState(null); //맵의 사이즈
  const [mapBounds, setMapBounds] = useState(null); //맵의 반경
  const [bigLocation, setBigLocation] = useState(null);
  const [smallLocation, setSmallLocation] = useState(null);

  useEffect(() => {
    console.log("맵 생성 시작");
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.715133, 126.734086), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
        // 현재 위치 중심으로 맵을 처음 보여주고 싶으면 주석 지우기. 단, 렌더링 2번 됨
        // center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
        // level: size, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    // console.log("맵 생성 중");

    // console.log(mapContainer);
    // console.log(mapOption);
    const map = new kakao.maps.Map(mapContainer, mapOption);
    map.setMaxLevel(13); //맵의 최대 축소 크기
    map.setMinLevel(3); //맵의 최소 확대 크기

    setMap(map);
    // console.log("맵 생성 완료");
  }, [currentX]);

  //줌 변화 시, 맵 반경 변화
  useEffect(() => {
    if (_map == null || size == null || currentX == null) return;

    // console.log("사이즈가 변경됨에 따라 반경 변경 시작");
    //지도의 범위 적용하기
    var bounds = _map.getBounds();
    const haversine = require("haversine");

    // console.log(bounds);

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
      // console.log("radiusMaht가 0 입니다.");
      radiusMath = 1;
    }
    setMapBounds((mapBounds) => (mapBounds = radiusMath));

    // console.log("size : " + size);
    console.log("radiusMath : " + radiusMath);
    console.log("mapBounds : " + mapBounds);
  }, [x, size]);

  // console.log("맵 생성 return 실행");

  return (
    <>
      <KaKaoMap id="map">
        <CurrentMarker
          _map={_map}
          currentX={currentX}
          currentY={currentY}
          setCurrentX={setCurrentX}
          setCurrentY={setCurrentY}
          setX={setX}
          setY={setY}
          setSize={setSize}
        />
        <SaveMapData
          _map={_map}
          mapData={props.mapData}
          setMapData={props.setMapData}
          x={x}
          y={y}
          currentX={currentX}
          size={size}
          mapBounds={mapBounds}
        />
        <MapEvent
          setX={setX}
          setY={setY}
          _map={_map}
          size={size}
          setSize={setSize}
        />
        <ShowMarker mapData={props.mapData} _map={_map} />
        <SearchLocation
          bigLocation={bigLocation}
          smallLocation={smallLocation}
          setMapData={props.setMapData}
        />
      </KaKaoMap>
      <MapBtns>
        <MapBtnsLeft>
          <SelectRegion onClick={props.openLocationModal}>
            지역 선택
          </SelectRegion>
          {/* <Location top="120" onClick={panTo}>
            <ImgComponent src={"gps.png"} width={"100%"} />
          </Location> */}
        </MapBtnsLeft>
        {/* <MapBtnsRight>
          <MapSize top="0" onClick={zoomIn}>
            <ImgComponent src={"plus.png"} width={"100%"} />
          </MapSize>
          <MapSize top="120" onClick={zoomOut}>
            <ImgComponent src={"minus.png"} width={"100%"} />
          </MapSize>
        </MapBtnsRight> */}
      </MapBtns>
    </>
  );
};

export default CreateMap;

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

const MapBtns = styled.div`
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  top: 7%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BtnStyle = styled.div`
  background: #16312c;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;
const MapBtnsLeft = styled.div``;
const MapBtnsRight = styled.div``;
const SelectRegion = styled(BtnStyle)``;
const Location = styled(BtnStyle)`
  width: 20px;
  margin-top: 10px;
`;
const MapSize = styled(BtnStyle)`
  width: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
`;
