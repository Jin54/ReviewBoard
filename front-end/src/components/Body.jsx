import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import MapOrList from "./body/MapOrList";
import Map from "./body/Map";
import List from "./body/list/List";
import DetailModal from "./body/modal/DetailModal";
import useCreateMap from "../utils/useCreateMap";

const Body = () => {
  const openListModal = useSelector((state) => state.openBool.listModal);
  const openDetailModal = useSelector((state) => state.openBool.detailModal);

  useCreateMap();

  return (
    <>
      <MapOrList />
      <BodyWrap>
        <Map />
        {openListModal && (
          <ListWrap>
            <List />
          </ListWrap>
        )}
        {openDetailModal && <DetailModal />}
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
  position: relative;
  overflow: hidden;
  position: relative;
`;
const ListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding-left: 20%;
  padding-right: 20%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fafafa;
  z-index: 5;
  @media screen and (max-width: 1000px) {
    padding: 5%;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    width: 100%;
  }
`;

export default Body;
