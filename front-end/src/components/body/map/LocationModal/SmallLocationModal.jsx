//상세 지역 선택 모달창
import { useSelector } from "react-redux";
import styled from "styled-components";

import dummy from "../../../../db/location.json";

const { kakao } = window;

const SmallLocationModal = (props) => {
  const _map = useSelector((state) => state.setMap._map);

  if (props.bigLocationName === null) return;

  const searchSmallLocationList = dummy.smallLocations.filter(
    (smallLocation) => smallLocation.location === props.bigLocationName
  );

  const smallLocationList = searchSmallLocationList.map((smallLocation) => (
    <Region
      key={smallLocation.id}
      id={smallLocation.id}
      onClick={() => {
        //좌표이동
        if (_map === null) return;

        var geocoder = new kakao.maps.services.Geocoder();
        const location = smallLocation.location + " " + smallLocation.name;

        geocoder.addressSearch(location, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            _map.setLevel(7);
            _map.setCenter(coords);
            props.setXY([result[0].x, result[0].y]);
          }
        });

        //모달창닫기
        props.setModalOpen(false);
      }}
      name={smallLocation.name}
    />
  ));

  return <>{smallLocationList}</>;
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
