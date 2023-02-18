import styled from "styled-components";

import ImgComponent from "./ImageComponent";

const HeaderSlide = (props) => {
  // 햄버거 버튼 시 보이는 메뉴 모달
  return (
    <MobileMenuWrap>
      <MobileMenuBox>
        <CloseWrap>
          <Close
            onClick={() => {
              props.setMobileMenu(false);
            }}
          >
            <ImgComponent src={"close.png"} width={"100%"} />
          </Close>
        </CloseWrap>
        <MFoodBtn
          onClick={() => {
            props.setMobileMenu(false);
          }}
        >
          즐겨찾기
        </MFoodBtn>
        <MFoodBtn
          onClick={() => {
            props.BackBlackonClickURL("shop");
            props.setMobileMenu(false);
          }}
        >
          맛집
        </MFoodBtn>
        <MHospitalBtn
          onClick={() => {
            props.onClickURL("hospital");
            props.setMobileMenu(false);
          }}
        >
          병원
        </MHospitalBtn>
        <MHospitalBtn
          onClick={() => {
            props.onClickURL("hospital");
            props.setMobileMenu(false);
          }}
        ></MHospitalBtn>
        <MQuestionBtn
          href="mailto:sales@lfin.kr"
          onClick={() => {
            props.setMobileMenu(false);
          }}
        >
          문의
        </MQuestionBtn>
      </MobileMenuBox>
      <BackBlack
        onClick={() => {
          props.setMobileMenu(false);
        }}
      ></BackBlack>
    </MobileMenuWrap>
  );
};

export default HeaderSlide;

const MobileMenuWrap = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 20;
  width: 100%;
`;
const MobileMenuBox = styled.div`
  background: #ffffff;
  border-radius: 20px 0px 0px 20px;
  width: 45%;
  position: absolute;
  right: 0;
  z-index: 30;
  height: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
`;
const CloseWrap = styled.div`
  &::after {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
  &::before {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
`;
const Close = styled.div`
  width: 17px;
  height: 17px;
  float: right;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    width: 12px;
    height: 12px;
    margin-right: 0;
    padding-right: 0;
  }
`;
const MFoodBtn = styled.p`
  padding-top: 15px;
  padding-bottom: 15px;
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
  cursor: pointer;
`;
const MHospitalBtn = styled.p`
  padding-top: 15px;
  padding-bottom: 30px;
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
  cursor: pointer;
`;
const MQuestionBtn = styled.a`
  padding-top: 30px;
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
  border-top: 0.5px solid #c09567;
  text-decoration: none;
  display: block;
  cursor: pointer;
`;
const BackBlack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;
