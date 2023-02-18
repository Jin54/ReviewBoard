import styled from "styled-components";

import SelectLocationBtn from "./SelectLocationBtn";
import GPSBtn from "./GPSBtn";

const MapBtns = (props) => {
  return (
    <>
      <MapButtons>
        <MapBtnsLeft>
          <SelectLocationBtn setModalOpen={props.setModalOpen} />
          <GPSBtn setXY={props.setXY} />
        </MapBtnsLeft>
        <MapBtnsRight></MapBtnsRight>
      </MapButtons>
    </>
  );
};

export default MapBtns;

const MapButtons = styled.div`
  position: absolute;
  left: 50%;
  width: 90%;
  top: 7%;
  transform: translateX(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MapBtnsLeft = styled.div`
  top: 5%;
  left: 3%;
  position: absolute;
`;
const MapBtnsRight = styled.div`
  top: 5%;
  right: 3%;
  position: absolute;
`;
