import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CreateMap from "./map/CreateMap";
import RegionListModal from "./RegionListModal";

const Body = (props) => {
  //지역 선택 모달
  const [showRegion, setShowRegion] = useState(false);
  const openRegion = () => {
    setShowRegion(true);
  };
  const closeRegion = () => {
    setShowRegion(false);
  };

  //useEffect 사용
  useEffect(() => {}, []);

  return (
    <BodyWrap>
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

export default Body;
