import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CreateMap from "./map/CreateMap";
import RegionListModal from "./RegionListModal";

// import compass from "./../img/mapCompass.svg";
import ImgComponent from "./ImageComponent";

const Body = (props) => {
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

  return (
    <BodyWrap>
      {/* <Map size={size} /> */}
      <CreateMap openRegion={openRegion} />
      {showRegion && (
        <RegionListModal closeRegion={closeRegion} showList={props.showList} />
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
