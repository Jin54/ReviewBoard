import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeURL } from "../../modules/urlChange";
import { setOpenMobileMenu } from "../../modules/openBool";

import ImgComponent from "../ImageComponent";
import Kakaologin from "./login/Kakaologin";
import HeaderSlide from "./HearderSlide";
import BookmarkBtn from "./login/BookmarkBtn";
import Footer from "../Footer";

const Header = () => {
  // 모바일 메뉴
  const openMobileMenu = useSelector((state) => state.openBool.mobileMenu);
  const dispatch = useDispatch();
  const SetOpenMobileMenu = useCallback(
    (bool) => dispatch(setOpenMobileMenu(bool)),
    [dispatch]
  );

  //클릭 시 맛집, 병원 API 변경
  const onClickURL = useCallback(
    (name) => dispatch(changeURL(name)),
    [dispatch]
  );
  const showURL = useSelector((state) => state.urlChange.name);
  const openLogin = useSelector((state) => state.openBool.login);
  const userName = useSelector((state) => state.userData.name);
  const menuHamburger = useSelector((state) => state.openBool.mobileMenu);

  return (
    <HeaderWrap>
      <HedaerLeftWrap>
        <ImgBox>
          <ImgComponent
            src={"logo_WHITE.png"}
            height={"100%"}
            onClick={() => {
              window.location.replace("/");
            }}
          />
        </ImgBox>
        {openLogin && <Name>{userName} 님</Name>}
        <KakaologinWrap><Kakaologin /></KakaologinWrap>
        <BookmarkWrap><BookmarkBtn /></BookmarkWrap>
      </HedaerLeftWrap>
      <HeaderRightWrap>
      <FoodBtn
          selected={showURL == "shop" && true}
          onClick={() => {
            onClickURL("shop");
          }}
        >
          맛집
        </FoodBtn>
        <HospitalBtn
          selected={showURL == "hospital" && true}
          onClick={() => {
            onClickURL("hospital");
          }}
        >
          병원
        </HospitalBtn>
      </HeaderRightWrap>
      <FooterWrap><Footer /></FooterWrap>
      <MobileMenu>
        <HamburgerBtn
          onClick={() => {
            SetOpenMobileMenu(!menuHamburger);
          }}
        >
          <ImgComponent src={"hamburger.png"} width={"80%"} />
        </HamburgerBtn>
        {openMobileMenu && <HeaderSlide />}
      </MobileMenu>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  position: absolute;
  z-index: 35;
  height: 100%;
  width: 10%;
  background-color: #00B295;
  box-shadow: 6px 4px 16px rgba(0, 0, 0, 0.25);
  /* margin-top: 10px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    height: 40px;
    flex-direction: row;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px 0;
  }
`;
// ============
const HedaerLeftWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 18%;
  width: 50%;
  /* height: 60px; */
  @media screen and (max-width: 1400px) and (min-width: 1000px) {
      width: 80%;
    }
  @media screen and (max-width: 1000px) {
    width: 18%;
    height: 100%;
  }
`;

const ImgBox = styled.div`
  cursor: pointer;
  height: 60px;
  @media screen and (max-width: 1000px) {
    height: 100%;
  }
`
const UrlBtn = styled.p`
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  font-size: 16px;
  letter-spacing: 0.01em;
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  padding: 3px 24px;
  border-radius: 4px;
  white-space:nowrap;
  font-weight: ${(props) => (props.selected ? "700" : "300")};
  /* @media screen and (max-width: 1400px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 30px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  } */
  cursor: pointer;
`;
const FoodBtn = styled(UrlBtn)`
  /* @media screen and (min-width: 1400px) {
    margin-left: 100px;
  } */
`;
const HospitalBtn = styled(UrlBtn)`
  /* @media screen and (min-width: 1400px) {
    margin-left: 70px;
  } */
`;

const KakaologinWrap = styled.div`
width: 100%;
white-space:nowrap;
    @media screen and (max-width: 1000px) {
    display: none;
  }
`
const BookmarkWrap = styled.div`
width: 100%;
white-space:nowrap;
    @media screen and (max-width: 1000px) {
    display: none;
  }
`

// ============
const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #fafafa;
  padding: 4px;
  border-radius: 6px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const Name = styled.div`
  font-size: 16px;
  color: #fafafa;
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
  margin-right: 30px;
`;

const FooterWrap = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Header;
