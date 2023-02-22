import React, { useCallback } from "react";
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

  //로그인
  const showURL = useSelector((state) => state.urlChange.name);

  //북마크 관련
  return (
    <>
      <HeaderWrap>
        <HedaerLeftWrap>
          <ImgComponent
            src={"logo.png"}
            height={"100%"}
            onClick={() => {
              window.location.replace("/");
            }}
          />
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
          <Kakaologin />
          <BookmarkBtn />
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
    </>
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
  border-bottom: 0px solid #c09567;
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  padding-bottom: ${(props) => props.selected && "10px"};
  border-bottom: ${(props) => props.selected && "4px"};
  @media screen and (max-width: 1400px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
  cursor: pointer;
`;
const FoodBtn = styled(UrlBtn)`
  margin-left: 100px;
`;
const HospitalBtn = styled(UrlBtn)`
  margin-left: 70px;
`;

// ============
const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
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
