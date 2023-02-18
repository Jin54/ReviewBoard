// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )
import styled from "styled-components";
import ImgComponent from "../../../ImageComponent";

const DetailInfo = (props) => {
  return (
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={"100%"} />
      </InfoIcon>
      {props.txt ? (
        <InfoTxt>{props.txt}</InfoTxt>
      ) : (
        <InfoTxt>정보가 존재하지 않습니다.</InfoTxt>
      )}
    </InfoWrap>
  );
};

export default DetailInfo;

const InfoWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 10px;
  }
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
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;
