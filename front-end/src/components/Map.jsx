import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const Map = (props) => {
  //카카오 맵 api 설정
  useEffect(() => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36, 127.9), //지도의 중심좌표. 필수값
      level: props.size, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, [props.size]);

  return <KaKaoMap id="map"></KaKaoMap>;
};

const KaKaoMap = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
