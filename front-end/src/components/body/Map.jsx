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
  /*
   * FIXME - _map이라고 명명한 특별한 이유가 있으신가요?!
   *  _를 앞에 붙이는건 강제성은 없지만 의미론적으로 private 함수나 변수명 앞에 붙여서 이 함수나 변수는 private한 속성을 가진다
   *  라고 의미를 부여할 때 사용했었습니다. (지금은 #을 prefix로 붙여 private 함수나 변수를 만들 수 있습니다.)
   */
  /*
   * FIXME - 합쳐버릴까요?!
   *  const {_map, mapData, bookmarkData} = useSelector((state) => state.setMap);
   */
  const _map = useSelector((state) => state.setMap._map);
  const mapData = useSelector((state) => state.saveData.mapData);
  const bookmarkData = useSelector((state) => state.saveData.bookmarkData);

  const [modalOepn, setModalOpen] = useState(false);
  const [currentBtnOpen, setCurrentBtnOpen] = useState(false);
  const [xy, setXY] = useState({}); //중심 좌표
  const [size, setSize] = useState(null);

  return (
    <>
      <KaKaoMap id="map">
        {/*
          * FIXME - 이렇게 하면 어떨까요?
          *  _map !== null && (...)
          */}
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
