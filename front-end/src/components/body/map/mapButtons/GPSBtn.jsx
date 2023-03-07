import styled from "styled-components";
import { useSelector } from "react-redux";

import ImgComponent from "../../../ImageComponent";

const { kakao } = window;

const GPSBtn = (props) => {
  /*
   * FIXME - 음... 위치 정보를 가져오는 버튼 인 것 같아요
   *  위치 정보는 지도와 별도로 조회할 수 있고 관리될 수 있으니까 지도 element의 존재 여부를 체크하지 않아도 될 것 같아요.
   *  위치 정보를 reducer에 저장해서 관리하고 map에서 이 데이터를 사용하는 구조로 변경하면 관리하기 편리해질 것 같아요.
   */
  const _map = useSelector((state) => state.setMap._map);

  if (_map == null) return;

  const panTo = () => {
    /*
     * FIXME - 함수를 수행하는데 필요한 조건을 충족하지 않았을 때 미리 return 해버리면 가독성이 좋아질거에요.
     *  if(!navigator.geolocation) {
     *    props.setXY([37.715133, 126.734086]);
     *    alert("현재 위치를 허용해주세요.");
     *    return;
     *  }
     *  // navigator.geolocation이 있을 때 수행할 코드...
     */
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
