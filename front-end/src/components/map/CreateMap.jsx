import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ImgComponent from "./../ImageComponent";

const { kakao } = window;

const CreateMap = (props) => {
  const x = useSelector((state) => state.map.x);
  const y = useSelector((state) => state.map.y);

  const [_map, setMap] = useState();

  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    setMap(map);
  }, []);

  //지도 줌 인&줌 아웃
  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  };

  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  };

  return (
    <>
      <KaKaoMap id="map"></KaKaoMap>
      <MapBtns>
        <MapBtnsLeft>
          <SelectRegion onClick={props.openRegion}>지역 선택</SelectRegion>
          <Location top="120">
            <ImgComponent src={"gps.png"} width={"100%"} />
          </Location>
        </MapBtnsLeft>
        <MapBtnsRight>
          <MapSize top="0" onClick={zoomIn}>
            <ImgComponent src={"plus.png"} width={"100%"} />
          </MapSize>
          <MapSize top="120" onClick={zoomOut}>
            <ImgComponent src={"minus.png"} width={"100%"} />
          </MapSize>
        </MapBtnsRight>
      </MapBtns>
    </>
  );
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

const MapBtns = styled.div`
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  top: 7%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BtnStyle = styled.div`
  background: #16312c;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;
const MapBtnsLeft = styled.div``;
const MapBtnsRight = styled.div``;
const SelectRegion = styled(BtnStyle)``;
const Location = styled(BtnStyle)`
  width: 20px;
  margin-top: 10px;
`;
const MapSize = styled(BtnStyle)`
  width: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export default CreateMap;
