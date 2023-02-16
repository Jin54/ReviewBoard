//상세 지역 선택 모달창
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

import { openListPage } from "../../modules/showList";
import dummy from "../../db/location.json";

const SmallLocationModal = (props) => {
  //리스트 보여주기 - 지도는 항상 뒤에 있음 (리렌더링 방지)
  const dispatch = useDispatch();
  const OpenListPage = useCallback(() => dispatch(openListPage()), [dispatch]);

  console.log("상세 지역 선택 모달창 실행");
  if (props.bigLocation === null) return;

  const searchSmallLocationList = dummy.smallLocations.filter(
    (smallLocation) => smallLocation.location === props.bigLocation
  );

  const smallLocationList = searchSmallLocationList.map((smallLocation) => (
    <Region
      key={smallLocation.id}
      id={smallLocation.id}
      onClick={() => {
        props.setSmallLocation(smallLocation.name);
        props.closeLocationModal();
        OpenListPage();
      }}
      selected={props.smallLocation === smallLocation.name && "selected"}
      name={smallLocation.name}
    ></Region>
  ));

  return smallLocationList;
};

export default SmallLocationModal;

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
