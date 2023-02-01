import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import RegionListModal from "./RegionListModal";
import Slider from "./Slider";

import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../modules/mapSize";

import compass from "./../img/mapCompass.svg";

const Body = () => {
  //지역 선택 모달
  const [showRegion, setShowRegion] = useState(false);
  const openRegion = () => {
    setShowRegion(true);
  };
  const closeRegion = () => {
    setShowRegion(false);
  };

  // 만약에 아래에서 위로 슬라이드 하고 싶다면 여기 참고
  // https://velog.io/@qhdgkdbs/React%EC%97%90%EC%84%9C-ios-%ED%9D%89%EB%82%B4%EB%82%B4%EA%B8%B0-Slide-Up-Modal-%EA%B5%AC%ED%98%84

  //맵 사이즈 변경 Redux
  const size = useSelector((state) => state.mapSize.number);
  const dispatch = useDispatch();
  const sizeUp = useCallback(() => dispatch(decrease()), [dispatch]);
  const sizeDown = useCallback(() => dispatch(increase()), [dispatch]);

  return (
    <BodyWrap>
      <Map size={size} />
      <MapBtns>
        <SelectRegion onClick={openRegion}>지역 선택</SelectRegion>
        <Location top="120"></Location>
        <MapSize top="0" onClick={() => sizeUp()}>
          +
        </MapSize>
        <MapSize top="120" onClick={() => sizeDown()}>
          -
        </MapSize>
      </MapBtns>
      <Slider></Slider>
      {showRegion && <RegionListModal closeRegion={closeRegion} />}
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
`;

//수정됨-보민
const MapBtns = styled.div`
  position: absolute;
  left: 5%;
  top: 7%;
  z-index: 10;
`;
const BtnStyle = styled.div`
  background: #16312c;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 20px;
`;
const SelectRegion = styled(BtnStyle)`
  /* height: 90px;
  width: 250px; 수정됨-하림*/ 
  /* height: 40px; */
  /* width: 100px; */
  font-size: 20px;
`
const Location = styled(BtnStyle)`
  height: 30px;
  width: 30px;
  /* position: absolute; */
  left: 0%;
  top: ${(props) => props.top}%;
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  padding: 20px;
  margin-top: 20px;
  background-image: url(${compass});
`;
const MapSize = styled(BtnStyle)`
  height: 30px;
  width: 30px;
  /* position: absolute; */
  left: 400%;
  padding: 10px;
  top: ${(props) => props.top}%;
`;

export default Body;
