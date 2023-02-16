import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import BigLocationModal from "./location/BigLocationModal";
import CreateMap from "./map/CreateMap";
import ListPage from "./list/ListPage";

const Body = (props) => {
  console.log("Body 실행");

  //지역 선택 모달
  const [showLocationModal, setShowLocationModal] = useState(false);
  const openLocationModal = () => {
    // console.log("지역 선택 모달을 보여줍니다.");
    setShowLocationModal(true);
  };
  const closeLocationModal = () => {
    // console.log("지역 선택 모달을 닫습니다.");
    setShowLocationModal(false);
  };

  //Map 변수
  const [mapData, setMapData] = useState(null); //맵 중심 좌표를 기준으로 리뷰 상위 100개 데이터
  //지역 선택
  const [bigLocation, setBigLocation] = useState(null);
  const [smallLocation, setSmallLocation] = useState(null);

  //useEffect
  //[삭제 예정]데이터가 잘 들어가는지 확인
  // useEffect(() => {
  //   if (_map == null) return;
  //   console.log("mapData");
  //   console.log(mapData);
  // }, [mapData]);
  // useEffect(() => {
  //   if (bigLocation === null) return;
  //   console.log("bigLocation : " + bigLocation);
  //   console.log("smallLocation : " + smallLocation);
  // }, [bigLocation, smallLocation]);
  // console.log(BigLocationModal);

  return (
    <BodyWrap>
      <CreateMap
        // setMap={setMap}
        // _map={_map}
        mapData={mapData}
        setMapData={setMapData}
        openLocationModal={openLocationModal}
      ></CreateMap>
      <ListPage mapData={mapData} setMapData={setMapData} />
      {showLocationModal && (
        <BigLocationModal
          closeLocationModal={closeLocationModal}
          bigLocation={bigLocation}
          smallLocation={smallLocation}
          setBigLocation={setBigLocation}
          setSmallLocation={setSmallLocation}
        />
      )}
    </BodyWrap>
  );
};

const BodyWrap = styled.div`
  width: 80%;
  margin: auto;
  box-sizing: border-box;
  flex: 1;
  border: 1px solid #c09567;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-top: 40px;
  position: relative;
  @media screen and (max-width: 1000px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export default Body;
