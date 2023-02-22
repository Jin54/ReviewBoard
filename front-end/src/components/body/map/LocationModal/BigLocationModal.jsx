//지역 선택 모달창
import { useState } from "react";
import styled from "styled-components";

import ImgComponent from "../../../ImageComponent";
import dummy from "../../../../db/location.json";
import SmallLocationModal from "./SmallLocationModal";

const BigLocationModal = (props) => {
  const [bigLocationName, setBigLocationName] = useState();

  //큰 지역 리스트
  const bigLocationList = dummy.bigLocations.map((bigLocations) => (
    <Region
      key={bigLocations.id}
      id={bigLocations.id}
      onClick={() => {
        setBigLocationName(bigLocations.search);
      }}
      selected={bigLocationName === bigLocations.search && "selected"}
      name={bigLocations.name}
    ></Region>
  ));

  return (
    <RegionSelectWrap>
      <CloseWrap>
        <Close onClick={() => props.setModalOpen(false)}>
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        <ListWrap>
          <FlexWrap>{bigLocationList}</FlexWrap>
          <Divider />
          <FlexWrap>
            <SmallLocationModal
              bigLocationName={bigLocationName}
              setModalOpen={props.setModalOpen}
              setXY={props.setXY}
            />
          </FlexWrap>
        </ListWrap>
      </Box>
    </RegionSelectWrap>
  );
};

export default BigLocationModal;

const RegionSelectWrap = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
  z-index: 20;
  border: 1px solid #c09567;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
  @media screen and (max-width: 1000px) {
    padding-top: 20px;
  }
`;
const CloseWrap = styled.div`
  &::after {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
  &::before {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
`;
const Close = styled.div`
  width: 17px;
  height: 17px;
  float: right;
  padding-right: 10px;
  margin-right: 1%;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    width: 12px;
    height: 12px;
    margin-right: 0;
    padding-right: 0;
  }
`;
const Box = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;
// 리스트
const ListWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: auto;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;
const Divider = styled.hr`
  border: 0;
  margin-bottom: 40px;
  margin-top: 40px;
  height: 0.5px;
  background-color: #c09567;
`;
// 지역 버튼
const Region = ({ onClick, selected, name }) => {
  return (
    <RegionBtn selected={selected} onClick={onClick}>
      {name}
    </RegionBtn>
  );
};

const RegionBtn = styled.div`
  border: 1px solid #000000;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.selected ? "##fff" : "#000")};
  margin: 1%;
  box-sizing: border-box;
  width: 12%;
  background-color: ${(props) => (props.selected ? "#C09567" : "#fff")};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 4px;
    width: 18%;
  }
`;
