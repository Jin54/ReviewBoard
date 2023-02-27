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
        <CreateMap />
        <Map />
        {openListModal && <ListWrap><List /></ListWrap>}
        {openDetailModal &&<DetailModal />}
      </BodyWrap>
    </>
  );
};

const BodyWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
  flex: 1;
  /* border-radius: 10px; */
  position: relative;
  overflow: hidden;
  /* margin-top: 20px; */
  position: relative;
  /* @media screen and (max-width: 1000px) {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  } */
`;
const ListWrap = styled.div`
display: flex;
align-items: center;
justify-content: center;
  position: absolute;
  padding-left: 20%;
  padding-right: 20%;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fafafa;
  z-index: 5;
  @media screen and (max-width: 1000px) {
    /* width: 100%; */
    padding: 5%;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    width: 100%;
  }
`
const DetailModalWrap = styled.div`
  display: flex;
align-items: center;
justify-content: center;
  position: absolute;
  /* padding-left: 30%;
  padding-right: 30%; */
  top:0;
  bottom: 0;
  left: 0;
  background-color: #fafafa;
  z-index: 10;
`

export default Body;
