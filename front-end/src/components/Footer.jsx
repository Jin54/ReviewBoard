import React, {useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import { setOpenMobileMenu } from "../modules/openBool";

const Footer = () => {
  const openFooter = useSelector((state) => state.openBool.mobileMenu);
  const dispatch = useDispatch();
  const SetOpenMobileMenu = useCallback(
    (bool) => dispatch(setOpenMobileMenu(bool)),
    [dispatch]
  );
  const footerAbout = useSelector((state) => state.openBool.mobileMenu);
  return (
    <FooterWrap>
      <FooterLeft>
      <QuestionBtn href="mailto:sales@lfin.kr">문의하기</QuestionBtn>
        <Privacy>개인정보처리방침</Privacy>
        <TOS>이용약관</TOS>
        <AboutWrap>
          <AboutTxt>ABOUT</AboutTxt>
          <AboutArrow
            onClick={() => {
              SetOpenMobileMenu(!footerAbout);
            }}
          ><ImgComponent src={'about_arrow.png'} height={'100%'} /></AboutArrow>
        </AboutWrap>
      </FooterLeft>
      {openFooter && <FooterRight>
        대표이사 : 박영경 <br />
        사업자 등록번호 : 317-81-47616 | 통신판매신고 제2021-서울영등포-1812호
        <br />
        제휴/문의 메일 : sales@lfin.kr | 대표번호 02-6959-7414
        <br />
        본사 : 서울시 강서구 마곡중앙8로 14, M+센터
        <br />
        기업부설 연구소 : 서울시 관악구 신림로 177 창업 HERE-RO3
      </FooterRight>}
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 14px;
  margin-bottom: 30px;
  margin-bottom: 0;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
   } 
`;
const FooterLeft = styled.div``;
const AboutWrap = styled.div`
margin-bottom:50px;
display: flex;
align-items: center;
justify-content: space-between;
@media screen and (max-width: 1000px) {
    display: none;
   } 
`;
const AboutTxt = styled.span`
    font-weight: 700;
  font-size: 14px;
  color: #fafafa;
`;
const AboutArrow = styled.div`
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Privacy = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    color: #fafafa;
    font-weight: 400;
  }
  @media screen and (max-width: 1400px) and (min-width:1000px) {
    font-size: 12px;
  }
`;
const TOS = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  margin-bottom: 30px;
  @media screen and (max-width: 1400px) and (min-width:1000px) {
    font-size: 12px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    color: #fafafa;
    font-weight: 400;
  }
`;
const QuestionBtn = styled.a`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: #fafafa;
  width: 100px;
  box-sizing: border-box;
  text-decoration: none;
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
  @media screen and (max-width: 1400px) and (min-width:1000px) {
    font-size: 12px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const FooterRight = styled.p`
position: absolute;
/* float: left; */
left: 120%;
padding: 10px;
bottom: 60px;
  /* margin: 0; */
  width: 400px;
  background: #00B295;
border-radius: 6px;
  font-weight: 100;
  font-size: 12px;
  line-height: 24px;
  color: #FAFAFA;
  @media screen and (max-width: 1000px) {
    position: static;
    color: #fafafa;
    display: inline;
    font-size: 10px;
    padding: 0;
    line-height: 18px;
  }
`;


export default Footer;
