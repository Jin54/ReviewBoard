import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeURL } from "../../modules/urlChange";
import { setOpenMobileMenu } from "../../modules/openBool";

import ImgComponent from "../ImageComponent";
import Kakaologin from "./login/Kakaologin";
import HeaderSlide from "./HearderSlide";
import BookmarkBtn from "./login/BookmarkBtn";

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

  return (
    <HeaderWrap>
      <HedaerLeftWrap>
        <div style={{ cursor: "pointer", height: "100%" }}>
          <ImgComponent
            src={"logo.png"}
            height={"100%"}
            onClick={() => {
              window.location.replace("/");
            }}
          />
        </div>
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
      </HedaerLeftWrap>
      <HeaderRightWrap>
        {openLogin && <Name>{userName} 님</Name>}
        <KakaologinWrap><Kakaologin /></KakaologinWrap>
        <BookmarkWrap><BookmarkBtn /></BookmarkWrap>
      </HeaderRightWrap>
      <MobileMenu>
        <HamburgerBtn
          onClick={() => {
            SetOpenMobileMenu(true);
          }}
        >
          <ImgComponent src={"hamburger.png"} width={"100%"} />
        </HamburgerBtn>
        {openMobileMenu && <HeaderSlide />}
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
  height: 60px;
  @media screen and (max-width: 1000px) {
    height: 40px;
  }
`;
const UrlBtn = styled.p`
  color: #000;
  font-size: 16px;
  letter-spacing: 0.01em;
  /* border-bottom: 0px solid #c09567; */
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  padding-bottom: ${(props) => props.selected && "2px"};
  border-bottom: ${(props) => props.selected && "2px solid #c09567"};
  @media screen and (max-width: 1400px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 30px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
  cursor: pointer;
`;
const FoodBtn = styled(UrlBtn)`
  @media screen and (min-width: 1400px) {
    margin-left: 100px;
  }
`;
const HospitalBtn = styled(UrlBtn)`
  @media screen and (min-width: 1400px) {
    margin-left: 70px;
  }
`;

const KakaologinWrap = styled.div`
    @media screen and (max-width: 1000px) {
    display: none;
  }
`
const BookmarkWrap = styled.div`
    @media screen and (max-width: 1000px) {
    display: none;
  }
`

// ============
const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  font-size: 16px;
  color: #c09567;
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
