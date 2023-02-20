import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenBookmark } from "../../modules/openBool";
import { change } from "../../modules/urlChange";

import ImgComponent from "../ImageComponent";
import HeaderSlide from "./HearderSlide";
import OnClickBookmark from "./OnClickBookmark";

const Header = () => {
  // 모바일 메뉴
  const [mobilemenu, setMobileMenu] = useState(false);

  //클릭 시 맛집, 병원 API 변경
  const dispatch = useDispatch();
  const onClickURL = useCallback((name) => dispatch(change(name)), [dispatch]);
  //북마크 관련
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const SetOpenBookmark = useCallback(() => {
    dispatch(setOpenBookmark());
  }, [dispatch]);

  return (
    <>
      {openBookmark && <OnClickBookmark />}
      <HeaderWrap>
        <HedaerLeftWrap>
          <ImgComponent src={"logo.png"} width={"60px"} />
          <FoodBtn
            onClick={() => {
              onClickURL("shop");
            }}
          >
            맛집
          </FoodBtn>
          <HospitalBtn
            onClick={() => {
              onClickURL("hospital");
            }}
          >
            병원
          </HospitalBtn>
        </HedaerLeftWrap>
        <HeaderRightWrap>
          <HeaderRightBtn>로그인</HeaderRightBtn>
          <BookmarkBtn
            selected={openBookmark}
            onClick={() => {
              SetOpenBookmark();
            }}
          >
            즐겨찾기
          </BookmarkBtn>
        </HeaderRightWrap>
        <MobileMenu>
          <HamburgerBtn
            onClick={() => {
              setMobileMenu(true);
            }}
          >
            <ImgComponent src={"hamburger.png"} width={"100%"} />
          </HamburgerBtn>
          {mobilemenu && (
            <HeaderSlide
              setMobileMenu={setMobileMenu}
              onClickURL={onClickURL}
            />
          )}
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
  cursor: pointer;
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
  cursor: pointer;
`;

// ============
const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRightBtn = styled.a`
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
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const LoginBtn = styled(HeaderRightBtn)``;
const BookmarkBtn = styled(HeaderRightBtn)`
  background-color: ${(props) => props.selected && "red"};
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