import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CurrentMarker from "./map/showMap/CurrentMarker";
import ShowMarker from "./map/showMap/ShowMarker";
import SaveMapData from "./map/showMap/SaveMapData";
import MapEvent from "./map/showMap/MapEvent";
import MapBtns from "./map/mapButtons/MapBtns";
import BigLocationModal from "./map/LocationModal/BigLocationModal";

const Map = (props) => {
  const [modalOepn, setModalOpen] = useState(false);

  const _map = useSelector((state) => state.setMap._map);
  const [xy, setXY] = useState({}); //중심 좌표
  const [size, setSize] = useState(null);
  const [duplicateMapData, setDuplicateMapData] = useState(null); //중복되는 맵 데이터 id

  //삭제 예정
  // const mapData = useSelector((state) => state.saveData.mapData);
  // useEffect(() => {
  //   console.log("mapData");
  //   console.log(mapData);
  // }, [mapData]);
  // useEffect(() => {
  //   console.log("duplicateMapData");
  //   console.log(duplicateMapData);
  // }, [duplicateMapData]);
  // useEffect(() => {
  //   console.log(_map);
  // }, [_map]);

  return (
    <>
      <KaKaoMap id="map">
        {!(_map === null) && (
          <>
            <CurrentMarker setXY={setXY} />
            <MapEvent setXY={setXY} setSize={setSize} xy={xy} />
            <SaveMapData
              xy={xy}
              size={size}
              setDuplicateMapData={(data) => {
                setDuplicateMapData(data);
              }}
            />
            <ShowMarker
              setOpenDetailModal={props.setOpenDetailModal}
              setDuplicateMapData={setDuplicateMapData}
              duplicateMapDate={duplicateMapData}
            />
          </>
        )}
      </KaKaoMap>
      <MapBtns setModalOpen={setModalOpen} setXY={setXY} />
      {modalOepn && (
        <BigLocationModal setModalOpen={setModalOpen} setXY={setXY} />
      )}
    </>
  );
};

export default Map;

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;
