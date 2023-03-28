import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import MapBtns from "./map/mapButtons/MapBtns";
import BigLocationModal from "./map/LocationModal/BigLocationModal";

//hooks
import useCurrentMarker from "./../../hooks/useCurrentMarker";
import useMapEvent from "../../hooks/useMapEvent";
import useSaveMapData from "../../hooks/useSaveMapData";
import useShowMarker from "../../hooks/useShowMarker";

const Map = () => {
  const [modalOepn, setModalOpen] = useState(false);
  const [currentBtnOpen, setCurrentBtnOpen] = useState(false);
  const [xy, setXY] = useState([126.97645631375248, 37.566976954478896]); //중심 좌표
  const [size, setSize] = useState(null);

  useCurrentMarker(setXY, setCurrentBtnOpen);
  useMapEvent(setXY, setSize);
  useSaveMapData(xy, size);
  useShowMarker();

  return (
    <>
      <KaKaoMap id="map" />
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
