import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MapOrList from "./body/MapOrList";
import CreateMap from "./body/CreateMap";
import Map from "./body/Map";
import List from "./body/list/List";
import DetailModal from "./body/modal/DetailModal";

const Body = () => {
  const [openListModal, setOpenListModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <>
      <MapOrList
        openListModal={openListModal}
        setOpenListModal={setOpenListModal}
      />
      <BodyWrap>
        <CreateMap></CreateMap>
        <Map setOpenDetailModal={setOpenDetailModal} />
        {openListModal && <List setOpenDetailModal={setOpenDetailModal} />}
        {openDetailModal && (
          <DetailModal setOpenDetailModal={setOpenDetailModal} />
        )}
      </BodyWrap>
    </>
  );
};

const BodyWrap = styled.div`
  width: 80%;
  margin: auto;
  box-sizing: border-box;
  flex: 1;
  /* border: 1px solid #c09567; */
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
