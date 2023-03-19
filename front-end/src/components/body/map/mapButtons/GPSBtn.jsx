import styled from "styled-components";
import { useSelector } from "react-redux";

import ImgComponent from "../../../ImageComponent";

const { kakao } = window;

const GPSBtn = (props) => {
  const _map = useSelector((state) => state.setMap._map);

  if (_map == null) return;

  const panTo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        _map.setLevel(4);
        _map.setCenter(new kakao.maps.LatLng(lat, lon));
        props.setXY([lon, lat]);
      });
    } else {
      props.setXY([37.715133, 126.734086]);
      alert("현재 위치를 허용해주세요.");
    }
  };

  return (
    <GPSButton
      top="120"
      onClick={() => {
        props.currentBtnOpen ? panTo() : alert("현재 위치를 동의해주세요.");
      }}
    >
      <ImgComponent src={"gps.png"} width={"100%"} />
    </GPSButton>
  );
};

export default GPSBtn;

const BtnStyle = styled.div`
  background: #00B295;
  border-radius: 6px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  cursor: pointer;
  transition: 0.2s ease-in;
    &:hover{
      box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;

const GPSButton = styled(BtnStyle)`
  width: 20px;
  margin-top: 10px;
`;