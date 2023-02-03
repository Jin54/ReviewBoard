import React, { useState } from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";

const Header = () => {
  // 모바일 메뉴
  const [mobilemenu, setMobileMenu] = useState(false);
  const menuOpen = () => {
    setMobileMenu(true);
  };
  const menuClose = () => {
    setMobileMenu(false);
  };
  return (
    <HeaderWrap>
      <HedaerLeftWrap>
        <ImgComponent src={"logo.png"} width={"60px"} />
        <FoodBtn>맛집</FoodBtn>
        <HospitalBtn>병원</HospitalBtn>
      </HedaerLeftWrap>
      <Question href="mailto:sales@lfin.kr">문의하기</Question>
      <MobileMenu>
        <HamburgerBtn onClick={menuOpen}>
          <ImgComponent src={"hamburger.png"} width={"100%"} />
        </HamburgerBtn>
        {mobilemenu && <SlideMenu menuClose={menuClose} />}
      </MobileMenu>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// ============
const HedaerLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;
const FoodBtn = styled.div`
  margin-left: 100px;
  color: #000;
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  font-size: 16px;
  letter-spacing: 0.01em;
  border-bottom: 0px solid #c09567;
  padding-bottom: ${(props) => props.selected && "10px"};
  border-bottom: ${(props) => props.selected && "4px"};
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const HospitalBtn = styled.div`
  margin-left: 70px;
  color: #000;
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  font-size: 16px;
  letter-spacing: 0.01em;
  border-bottom: 0px solid #c09567;
  padding-bottom: ${(props) => props.selected && "10px"};
  border-bottom: ${(props) => props.selected && "4px"};
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

// ============
const Question = styled.a`
  border: 1.5px solid #c09567;
  border-radius: 50px;
  padding: 7px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #c09567;
  width: 100px;
  box-sizing: border-box;
  text-decoration: none;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const MobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 1000px) {
    display: block;
  }
`;
const HamburgerBtn = styled.div`
  width: 30px;
`;

export default Header;

// 햄버거 버튼 시 보이는 메뉴 모달
const SlideMenu = ({ menuClose }) => {
  return (
    <MobileMenuWrap>
      <MobileMenuBox>
        <CloseWrap>
          <Close onClick={menuClose}>
            <ImgComponent src={"close.png"} width={"100%"} />
          </Close>
        </CloseWrap>
        <MFoodBtn>맛집</MFoodBtn>
        <MHospitalBtn>병원</MHospitalBtn>
        <MQuestionBtn href="mailto:sales@lfin.kr">문의</MQuestionBtn>
      </MobileMenuBox>
      <BackBlack onClick={menuClose}></BackBlack>
    </MobileMenuWrap>
  );
};
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
`;
const MHospitalBtn = styled.p`
  padding-top: 15px;
  padding-bottom: 30px;
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
`;
const MQuestionBtn = styled.p`
  padding-top: 30px;
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
  border-top: 0.5px solid #c09567;
  text-decoration: none;
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
