// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )
import { useState } from "react";
import styled from "styled-components";

import ImgComponent from "../../../ImageComponent";

const DetailInfo = (props) => {
  const [dropDown, setDropDown] = useState("20px");
  const [arrow, setArrow] = useState("downArrow.png");

  const showALlTime = () => {
    if (dropDown == "20px") {
      setDropDown("100%");
      setArrow("upArrow.png");
    } else {
      setDropDown("20px");
      setArrow("downArrow.png");
    }
  };

  return (
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={"100%"} />
      </InfoIcon>
      {props.txt ? (
        <InfoTxt dropDown={dropDown}>{props.txt}</InfoTxt>
      ) : (
        <InfoTxt>정보가 존재하지 않습니다.</InfoTxt>
      )}
      {props.arrow && (
        <DropDownArrow onClick={showALlTime}>
          <ImgComponent src={arrow} width={"100%"} />
        </DropDownArrow>
      )}
    </InfoWrap>
  );
};

export default DetailInfo;

const InfoWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: "top";
`;
const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 10px;
`;
const InfoTxt = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  white-space: pre-wrap;
  overflow: hidden;
  height: ${(props) => props.dropDown};
`;

const DropDownArrow = styled.div`
  width: 14px;
  height: 100%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 4px;
`;
