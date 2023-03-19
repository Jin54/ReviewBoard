import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CurrentMarker from "./map/showMap/CurrentMarker";
import SaveMapData from "./map/showMap/SaveMapData";
import MapEvent from "./map/showMap/MapEvent";
import MapBtns from "./map/mapButtons/MapBtns";
import BigLocationModal from "./map/LocationModal/BigLocationModal";
import ShowMarker from "./map/showMap/ShowMarker";

const Map = () => {
  const _map = useSelector((state) => state.setMap._map);
  const [modalOepn, setModalOpen] = useState(false);
  const [currentBtnOpen, setCurrentBtnOpen] = useState(false);
  const [xy, setXY] = useState([126.97645631375248, 37.566976954478896]); //중심 좌표
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
            <ShowMarker />
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
