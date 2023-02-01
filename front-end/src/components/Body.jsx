import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import Map from "./Map";

import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../modules/mapSize";

import compass from "./../img/mapCompass.svg";

const Body = () => {
  // 도시 선택 버튼
  const [city, setCity] = useState("");

  // 세부 지역 선택 버튼
  const [region, setRegion] = useState("");

  //지역 선택 모달
  const [showRegion, setShowRegion] = useState(false);
  const openRegion = () => {
    setShowRegion(true);
  };
  const closeRegion = () => {
    setShowRegion(false);
  };

  // 만약에 아래에서 위로 슬라이드 하고 싶다면 여기 참고
  // https://velog.io/@qhdgkdbs/React%EC%97%90%EC%84%9C-ios-%ED%9D%89%EB%82%B4%EB%82%B4%EA%B8%B0-Slide-Up-Modal-%EA%B5%AC%ED%98%84

  //맵 사이즈 변경 Redux
  const size = useSelector((state) => state.mapSize.number);
  const dispatch = useDispatch();
  const sizeUp = useCallback(() => dispatch(decrease()), [dispatch]);
  const sizeDown = useCallback(() => dispatch(increase()), [dispatch]);


  return (
    <BodyWrap>
      <Map size={size} />
      <MapBtns>
        <SelectRegion onClick={openRegion}>지역 선택</SelectRegion>
        <Location top="120"></Location>
        <MapSize top="0" onClick={() => sizeUp()}>
          +
        </MapSize>
        <MapSize top="120" onClick={() => sizeDown()}>
          -
        </MapSize>
      </MapBtns>
      <Slider></Slider>
      {showRegion && (
        <RegionListModal
          closeRegion={closeRegion}
          setRegion={setRegion}
          region={region}
          city={city}
          setCity={setCity}
        />
      )}
    </BodyWrap>
  );
};

const BodyWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  border: 1px solid #c09567;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-top: 100px;
  position: relative;
`;

//수정됨-보민
const MapBtns = styled.div`
  position: absolute;
  left: 5%;
  top: 7%;
  z-index: 10;
  background-color: red;
`;
const BtnStyle = styled.div`
  background: #16312c;
  border: 1px solid #c09567;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectRegion = styled(BtnStyle)`
  height: 90px;
  width: 250px;
`;
const Location = styled(BtnStyle)`
  height: 90px;
  width: 90px;

  position: absolute;
  left: 0%;
  top: ${(props) => props.top}%;

  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  background-image: url(${compass});
`;
const MapSize = styled(BtnStyle)`
  height: 90px;
  width: 90px;

  position: absolute;
  left: 400%;
  top: ${(props) => props.top}%;
`;

/*
const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const MapBtns = styled.div`
  position: absolute;
  left: 5%;
  top: 7%;
  z-index: 10;
`;
const SelectRegion = styled.div`
  height: 90px;
  background: #16312c;
  border: 1px solid #c09567;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  padding: 10px;
  box-sizing: border-box;
`;
*/

export default Body;

// ========== Body Slider Wrap 지도 위 슬라이드

const Slider = () => {
  // const settings = {
  //     pauseOnHover: true,
  //     dots: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };

  return (
    <SliderWrap>
      {/* <Slider {...settings}> */}
      <SlideContent />
      {/* </Slider> */}
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 10;
  background-color: #8f8fec;
`;

// =========== Body Slider Content

const SlideContent = (props) => {
  return <SliderContentWrap></SliderContentWrap>;
};

const SliderContentWrap = styled.div`
  width: 70%;
  height: 100%;
  background: #68b968;
  border: 1px solid #c09567;
  border-radius: 10px;
  margin: auto; // 나중에 지워도 됨
`;

// =========== RegionListModal 지역 선택 모달

const RegionListModal = ({ closeRegion, setRegion, region, setCity, city }) => {
  return (
    <RegionSelectWrap>
      <Close onClick={closeRegion}>
        <ImgComponent src={"close.png"} width={"100%"} />
      </Close>
      <ListWrap>
        <FlexWrap>
          <Region
            onClick={() => setCity("서울")}
            selected={city === "서울" && "selected"}
            name={"서울"}
          ></Region>
          <Region
            onClick={() => setCity("경기")}
            selected={city === "경기" && "selected"}
            name={"경기"}
          ></Region>
          <Region
            onClick={() => setCity("인천")}
            selected={city === "인천" && "selected"}
            name={"인천"}
          ></Region>
          <Region
            onClick={() => setCity("부산")}
            selected={city === "부산" && "selected"}
            name={"부산"}
          ></Region>
          <Region
            onClick={() => setCity("대구")}
            selected={city === "대구" && "selected"}
            name={"대구"}
          ></Region>
          <Region
            onClick={() => setCity("대전")}
            selected={city === "대전" && "selected"}
            name={"대전"}
          ></Region>
          <Region
            onClick={() => setCity("울산")}
            selected={city === "울산" && "selected"}
            name={"울산"}
          ></Region>
          <Region
            onClick={() => setCity("세종")}
            selected={city === "세종" && "selected"}
            name={"세종"}
          ></Region>
          <Region
            onClick={() => setCity("강원")}
            selected={city === "강원" && "selected"}
            name={"강원"}
          ></Region>
          <Region
            onClick={() => setCity("충북")}
            selected={city === "충북" && "selected"}
            name={"충북"}
          ></Region>
          <Region
            onClick={() => setCity("충남")}
            selected={city === "충남" && "selected"}
            name={"충남"}
          ></Region>
          <Region
            onClick={() => setCity("광주")}
            selected={city === "광주" && "selected"}
            name={"광주"}
          ></Region>
          <Region
            onClick={() => setCity("전북")}
            selected={city === "전북" && "selected"}
            name={"전북"}
          ></Region>
          <Region
            onClick={() => setCity("전남")}
            selected={city === "전남" && "selected"}
            name={"전남"}
          ></Region>
          <Region
            onClick={() => setCity("경북")}
            selected={city === "경북" && "selected"}
            name={"경북"}
          ></Region>
          <Region
            onClick={() => setCity("경남")}
            selected={city === "경남" && "selected"}
            name={"경남"}
          ></Region>
          <Region
            onClick={() => setCity("제주")}
            selected={city === "제주" && "selected"}
            name={"제주"}
          ></Region>
        </FlexWrap>
        <Divider />
        <FlexWrap>
          <Region
            onClick={() => setRegion("종로구")}
            selected={region === "종로구" && "selected"}
            name={"종로구"}
          ></Region>
          <Region
            onClick={() => setRegion("중구")}
            selected={region === "중구" && "selected"}
            name={"중구"}
          ></Region>
          <Region
            onClick={() => setRegion("용산구")}
            selected={region === "용산구" && "selected"}
            name={"용산구"}
          ></Region>
          <Region
            onClick={() => setRegion("성동구")}
            selected={region === "성동구" && "selected"}
            name={"성동구"}
          ></Region>
          <Region
            onClick={() => setRegion("광진구")}
            selected={region === "광진구" && "selected"}
            name={"광진구"}
          ></Region>
          <Region
            onClick={() => setRegion("동대문구")}
            selected={region === "동대문구" && "selected"}
            name={"동대문구"}
          ></Region>
          <Region
            onClick={() => setRegion("중랑구")}
            selected={region === "중랑구" && "selected"}
            name={"중랑구"}
          ></Region>
          <Region
            onClick={() => setRegion("성북구")}
            selected={region === "성북구" && "selected"}
            name={"성북구"}
          ></Region>
          <Region
            onClick={() => setRegion("강북구")}
            selected={region === "강북구" && "selected"}
            name={"강북구"}
          ></Region>
        </FlexWrap>
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
