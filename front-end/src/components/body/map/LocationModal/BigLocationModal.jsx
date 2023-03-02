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
    />
  ));

  return (
    <RegionSelectWrap>
      <BoxWrap>
        <CloseWrap>
        <Close onClick={() => props.setModalOpen(false)}>
          <ImgComponent src={"close.webp"} width={"100%"} />
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
      </BoxWrap>
      <BackBlack
        onClick={() => {
          props.setModalOpen(false)
        }}
      ></BackBlack>
    </RegionSelectWrap>
  );
};

export default BigLocationModal;

const RegionSelectWrap = styled.div`
  width: 70%;
  position: absolute;
  top: 50%;
  z-index: 20;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid #00B295;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
  @media screen and (max-width: 1000px) {
    width: 100%;
    bottom: 0;
    left: 0;
    transform: none;
    border: none;
    background-color: rgba(0,0,0,0);
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

const BoxWrap = styled.div`
  @media screen and (max-width: 1000px) {
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
  border: 1px solid #00B295;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
  cursor: pointer;
`;
const Divider = styled.hr`
  border: 0;
  margin-bottom: 40px;
  margin-top: 40px;
  height: 0.5px;
  background-color: #00B295;
`;

const BackBlack = styled.div`
  @media screen and (max-width: 1000px) {
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  }
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
  border: 1px solid #00B295;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  margin: 1%;
  box-sizing: border-box;
  width: 12%;
  background-color: ${(props) => (props.selected ? "#00B295" : "#fff")};
  transition: 0.2s ease-in;
    &:hover{
      box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
    }
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 4px;
    width: 18%;
  }
`;
