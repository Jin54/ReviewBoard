/*
  기능 : PC 헤더 부분
  중요 변수&함수
  - userName : 카카오톡 로그인 시, 해당 user의 이름 출력
  -
*/

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeURL } from "../../modules/urlChange";
import { setOpenMobileMenu } from "../../modules/openBool";

import ImgComponent from "../ImageComponent";
import KakaoLogin from "./login/KakaoLogin";
import HeaderSlide from "./HearderSlide";
import BookmarkBtn from "./login/BookmarkBtn";
import Footer from "./Footer";

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
        <KakaologinWrap>
          <KakaoLogin />
        </KakaologinWrap>
        <BookmarkWrap>
          <BookmarkBtn />
        </BookmarkWrap>
      </HedaerLeftWrap>
      <HeaderRightWrap>
        <FoodBtn
          {/* FIXME === 연산자로 비교해주세요
            *  selected={showURL === 'shop'}
            */}
          selected={showURL == "shop" && true}
          onClick={() => {
            onClickURL("shop");
          }}
        >
          맛집
        </FoodBtn>
        <HospitalBtn
          {/* FIXME === 연산자로 비교해주세요
            *  selected={showURL === 'shop'}
            */}
          selected={showURL == "hospital" && true}
          onClick={() => {
            onClickURL("hospital");
          }}
        >
          병원
        </HospitalBtn>
      </HeaderRightWrap>
      <FooterWrap>
        <Footer />
      </FooterWrap>
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
  background-color: #00b295;
  box-shadow: 6px 4px 16px rgba(0, 0, 0, 0.25);
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

const HedaerLeftWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 18%;
  width: 50%;
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
  @media screen and (max-height: 1000px) {
    margin-bottom: 20px;
  }
`;
const UrlBtn = styled.p`
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  font-size: 16px;
  letter-spacing: 0.01em;
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  padding: 3px 24px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: ${(props) => (props.selected ? "700" : "300")};
  cursor: pointer;
  transition: 0.2s ease-in;
  &:hover {
    box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const FoodBtn = styled(UrlBtn)``;
const HospitalBtn = styled(UrlBtn)``;

const KakaologinWrap = styled.div`
  width: 100%;
  white-space: nowrap;
  @media screen and (max-width: 1000px) {
    display: none;
  }
  @media screen and (max-height: 1000px) {
    margin-bottom: 20px;
  }
`;
const BookmarkWrap = styled.div`
  width: 100%;
  white-space: nowrap;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
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
  @media screen and (max-height: 1000px) {
    margin-top: 40px;
  }
`;
const Name = styled.div`
  font-size: 16px;
  color: #fafafa;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

/*
 * FIXME - 모바일에서만 보이는 영역이 필요해서 만든 컴포넌트라면
 * MobileOnly(예시)라는 컴포넌트로 만들고 전역에서 사용해도 좋을 것 같아요.
 * 컴포넌트 이름에 의미를 부여하다보면 동일한 스타일을 가진 중복되는 컴포넌트들이 많이 생길 수 있어요.
 * 의미가 필요한 컴포넌트와 그렇지않은 컴포넌트를 잘 분리해서 만들면 컴포넌트 수를 많이 줄일 수 있을 것 같아요.
 * <MobileOnly>
     <모바일에서만 보여주고 싶은 컴포넌트/>
 * </MobileOnly>
 */
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

/*
 * FIXME - MobileMenu 컴포넌트와 마찬가지로 PC에서만 보여주고 싶은 컴포넌트를 감싸는 용도라면
 * DesktopOnly(예시)라는 컴포넌트로 만들고 전역으로 사용해도 좋을 것 같아요
 * <MobileOnly>
     <PC에서만 보여주고 싶은 컴포넌트/>
 * </MobileOnly>
 */
const FooterWrap = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default Header;
