import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CurrentMarker from "./map/showMap/CurrentMarker";
import ShowMarker from "./map/showMap/ShowMarker";
import SaveMapData from "./map/showMap/SaveMapData";
import MapEvent from "./map/showMap/MapEvent";
import MapBtns from "./map/mapButtons/MapBtns";
import BigLocationModal from "./map/LocationModal/BigLocationModal";

const Map = () => {
  const mapData = useSelector((state) => state.saveData.mapData);
  const bookmarkData = useSelector((state) => state.saveData.bookmarkData);
  const _map = useSelector((state) => state.setMap._map);

  const [modalOepn, setModalOpen] = useState(false);
  const [currentBtnOpen, setCurrentBtnOpen] = useState(false);
  const [xy, setXY] = useState({}); //중심 좌표
  const [size, setSize] = useState(null);

  return (
    <>
      <KaKaoMap id="map">
        {!(_map === null) && (
          <>
            <CurrentMarker
              setXY={setXY}
              setCurrentBtnOpen={setCurrentBtnOpen}
            />
            <MapEvent setXY={setXY} setSize={setSize} xy={xy} />
            <SaveMapData xy={xy} size={size} />
            <ShowMarker mapData={mapData} show="coords" />
            <ShowMarker mapData={bookmarkData} show="bookmark" />
          </>
        )}
      </KaKaoMap>
      <MapBtns
        setModalOpen={setModalOpen}
        setXY={setXY}
        currentBtnOpen={currentBtnOpen}
      />
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
