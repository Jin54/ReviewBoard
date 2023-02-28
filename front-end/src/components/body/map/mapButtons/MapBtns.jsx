import styled from "styled-components";

import SelectLocationBtn from "./SelectLocationBtn";
import GPSBtn from "./GPSBtn";

const MapBtns = (props) => {
  return (
    <MapButtons>
        <SelectLocationBtn setModalOpen={props.setModalOpen} />
        <GPSBtn setXY={props.setXY} currentBtnOpen={props.currentBtnOpen} />
    </MapButtons>
  );
};

export default MapBtns;

const MapButtons = styled.div`
  position: absolute;
  left: 15%;
  display: flex;
  flex-direction: column;
  top: 5%;
  transform: translateX(-50%);
  z-index: 1;
  align-items: flex-start;
  @media screen and (max-width: 1000px){
    top: 8%;
    left: 10%;
  }
  @media screen and (max-width: 550px){
    top: 8%;
    left: 15%;
  }
`;
