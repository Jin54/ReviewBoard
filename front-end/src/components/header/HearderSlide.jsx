// 햄버거 버튼 시 보이는 메뉴 모달
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeURL } from "../../modules/urlChange";
import { setOpenMobileMenu } from "../../modules/openBool";

import ImgComponent from "./../ImageComponent";
import Footer from "../Footer";
import Kakaologin from "./login/Kakaologin";
import BookmarkBtn from "./login/BookmarkBtn";

const HeaderSlide = () => {
  //모바일 메뉴 닫기
  const dispatch = useDispatch();
  const SetOpenMobileMenu = useCallback(
    (bool) => dispatch(setOpenMobileMenu(bool)),
    [dispatch]
  );

  //클릭 시 맛집, 병원 API 변경
  const showURL = useSelector((state) => state.urlChange.name);
  const onClickURL = useCallback(
    (name) => dispatch(changeURL(name)),
    [dispatch]
  );
  const openLogin = useSelector((state) => state.openBool.login);
  const userName = useSelector((state) => state.userData.name);

  return (
    <MobileMenuWrap>
      <MobileMenuBox>
        <FlexWrap>
        <HeaderRightWrap>
          {openLogin && <Name>{userName} 님</Name>}
          <MHospitalBtn><Kakaologin /></MHospitalBtn>
          <MHospitalBtn><BookmarkBtn /></MHospitalBtn>
        </HeaderRightWrap>
        <Divider />
          <MFoodBtn
            selected={showURL == "shop" && true}
            onClick={() => {
              onClickURL("shop");
              SetOpenMobileMenu(false);
            }}
          >
            맛집
          </MFoodBtn>
          <MHospitalBtn
            selected={showURL == "hospital" && true}
            onClick={() => {
              onClickURL("hospital");
              SetOpenMobileMenu(false);
            }}
          >
            병원
          </MHospitalBtn>
          <Divider />
          <MQuestionBtn
            href="mailto:sales@lfin.kr"
            onClick={() => {
              SetOpenMobileMenu(false);
            }}
          >
            문의
          </MQuestionBtn>
        </FlexWrap>
        <Footer />
      </MobileMenuBox>
      <BackBlack
        onClick={() => {
          SetOpenMobileMenu(false);
        }}
      ></BackBlack>
    </MobileMenuWrap>
  );
};

export default HeaderSlide;

const MobileMenuWrap = styled.div`
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 0;
  width: 100%;
`;
const MobileMenuBox = styled.div`
  background: #00B295;
  border-radius: 0px 0px 10px 10px;
  width: 100%;
  position: absolute;
  right: 0;
  z-index: 30;
  /* height: 100%; */
  padding: 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const FlexWrap = styled.div`
  flex: 1;
  padding-right: 20px;
  /* width: 30%;
  float: right; */
`;

const Divider = styled.hr`
 border: 0;
 float: right;
 width: 30%;
  height: 0.5px;
  background-color: rgba(255, 255, 255, 0.5);
`

const MBtn = styled.div`
  color: #000;
  font-weight: 400;
  font-size: 20x;
  margin: 0;
  cursor: pointer;
`;
const MFoodBtn = styled(MBtn)`
  padding-top: 30px;
  padding-bottom: 30px;
  /* border-top: 0.5px solid #fafafa; */
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  @media screen and (max-width: 1000px) {
  text-align: right;
  color: #fafafa;
  }
`;
const MHospitalBtn = styled(MBtn)`
  padding-top: 15px;
  padding-bottom: 30px;
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  @media screen and (max-width: 1000px) {
  text-align: right;
    color: #fafafa;
  }
`;
const MQuestionBtn = styled.a`
  padding-top: 30px;
  padding-bottom: 30px;
  width: auto;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  text-decoration: none;
  display: block;
  @media screen and (max-width: 1000px) {
  text-align: right;
    color: #fafafa;
  }
`;
const BackBlack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const HeaderRightWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.div`
  font-size: 16px;
  color: #fafafa;
  margin-top: 16px;
  margin-bottom: 10px;
  @media screen and (max-width: 1000px) {
  text-align: right;
  padding: 15px 0 30px 0;
  }
`;