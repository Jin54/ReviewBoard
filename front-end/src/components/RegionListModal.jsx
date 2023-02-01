import React, { useCallback, useState } from "react";
import dummy from "./../db/location.json";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";

// =========== RegionListModal 지역 선택 모달
//수정-보민 : map, json DB, Redux (setCity)

const RegionListModal = (props) => {
  // 도시 선택 버튼
  const [locationBtn, setLocationBtn] = useState("");
  // 세부 지역 선택 버튼
  const [cityBtn, setCityBtn] = useState("");

  const locationList = dummy.locations.map((location) => (
    <Region
      key={location.id}
      id={location.id}
      onClick={() => {
        setLocationBtn(location.name);
      }}
      selected={locationBtn === location.name && "selected"}
      name={location.name}
    ></Region>
  ));

  const searchCityList = dummy.citys.filter(
    (city) => city.location === locationBtn
  );
  const cityList = searchCityList.map((city) => (
    <Region
      key={city.id}
      id={city.id}
      onClick={() => setCityBtn(city.name)}
      selected={cityBtn === city.name && "selected"}
      name={city.name}
    ></Region>
  ));

  return (
    <RegionSelectWrap>
      <Close onClick={props.closeRegion}>
        <ImgComponent src={"close.png"} width={"100%"} />
      </Close>
      <ListWrap>
        <FlexWrap>{locationList}</FlexWrap>
        <Divider />
        <FlexWrap>{locationBtn === "" ? <></> : cityList}</FlexWrap>
      </ListWrap>
    </RegionSelectWrap>
  );
};

const RegionSelectWrap = styled.div`
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
  z-index: 20;
  border-top: 1px solid #c09567;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
`;

const Close = styled.div`
  width: 17px;
  height: 17px;
  margin-bottom: 100px;
  float: right;
  padding-right: 10px;
  margin-right: 1%;
  margin-top: 40px;
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
  margin-bottom: 100px;
  margin-top: 100px;
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
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  color: ${(props) => (props.selected ? "##fff" : "#000")};
  margin: 1%;
  box-sizing: border-box;
  width: 12%;
  background-color: ${(props) => (props.selected ? "#C09567" : "#fff")};
`;

export default RegionListModal;
