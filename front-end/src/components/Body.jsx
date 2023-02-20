import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import MapOrList from "./body/MapOrList";
import CreateMap from "./body/CreateMap";
import Map from "./body/Map";
import List from "./body/list/List";
import DetailModal from "./body/modal/DetailModal";

const Body = () => {
  const openListModal = useSelector((state) => state.openBool.listModal);
  const openDetailModal = useSelector((state) => state.openBool.detailModal);

  return (
    <>
      <MapOrList />
      <BodyWrap>
        <CreateMap></CreateMap>
        <Map />
        {openListModal && <List />}
        {openDetailModal && <DetailModal />}
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
