import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import RegionListModal from "./RegionListModal";
import Slider from "./Slider";

import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../modules/mapSize";

// import compass from "./../img/mapCompass.svg";
import ImgComponent from "./ImageComponent";

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

  // <SelectRegion onClick={openRegion}>지역 선택</SelectRegion>
  //       <Location top="120"><ImgComponent src={'gps.png'} width={'100%'} /></Location>
  //       <MapSize top="0" onClick={() => sizeUp()}>
  //         +
  //       </MapSize>
  //       <MapSize top="120" onClick={() => sizeDown()}>
  //         -
  //       </MapSize>
  return (
    <BodyWrap>
      <Map size={size} />
      <MapBtns>
        <MapBtnsLeft>
          <SelectRegion onClick={openRegion}>지역 선택</SelectRegion>
          <Location top="120">
            <ImgComponent src={'gps.png'} width={'100%'} />
          </Location>
        </MapBtnsLeft>
        <MapBtnsRight>
          <MapSize top="0" onClick={() => sizeUp()}>
            <ImgComponent src={'plus.png'} width={'100%'} />
          </MapSize>
          <MapSize top="120" onClick={() => sizeDown()}>
            <ImgComponent src={'minus.png'} width={'100%'} />
          </MapSize>
        </MapBtnsRight>
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
  @media screen and (max-width: 1000px) {
    margin-top: 20px;
    width: 100%;
  }
`
const MapBtns = styled.div`
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  top: 7%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
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
`
const MapBtnsLeft = styled.div``
const MapBtnsRight = styled.div``
const SelectRegion = styled(BtnStyle)``
const Location = styled(BtnStyle)`
  width: 20px;
  margin-top: 10px;
`
const MapSize = styled(BtnStyle)`
  width: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
`


//수정됨-보민
// const SelectRegion = styled(BtnStyle)`
//   /* height: 90px;
//   width: 250px; 수정됨-하림*/ 
//   /* height: 40px; */
//   /* width: 100px; */
//   font-size: 20px;
// `
// const Location = styled(BtnStyle)`
//   height: 30px;
//   width: 30px;
//   /* position: absolute; */
//   /* left: 0%; */
//   /* top: ${(props) => props.top}%; */
//   /* padding: 20px; */
//   margin-top: 20px;
// `;
// const MapSize = styled(BtnStyle)`
//   height: 30px;
//   width: 30px;
//   /* position: absolute; */
//   /* left: 400%; */
//   /* padding: 10px; */
//   /* top: ${(props) => props.top}%; */
// `;

export default Body;
