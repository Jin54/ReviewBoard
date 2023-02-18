import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import MapOrList from "./body/MapOrList";
import CreateMap from "./body/CreateMap";
import Map from "./body/Map";
import List from "./body/list/List";
import DetailModal from "./body/modal/DetailModal";

const Body = () => {
  const [openListModal, setOpenListModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  //[삭제 예정]데이터가 잘 들어가는지 확인
  // const _map = useSelector((state) => state.setMap._map);
  // const mapData = useSelector((state) => state.saveData.mapData);
  // useEffect(() => {
  //   if (_map == null) return;
  //   console.log("mapData");
  //   console.log(mapData);
  // }, [mapData]);
  // const detailID = useSelector((state) => state.saveData.detailID);
  // useEffect(() => {
  //   console.log("detailID");
  //   console.log(detailID);
  // }, [detailID]);
  // const detailData = useSelector((state) => state.saveData.detailData);
  // useEffect(() => {
  //   console.log("detailData");
  //   console.log(detailData);
  // }, [detailData]);
  // const bookmark = useSelector((state) => state.bookmark);
  // useEffect(() => {
  //   console.log("bookmark");
  //   console.log(bookmark);
  // }, [bookmark]);

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
