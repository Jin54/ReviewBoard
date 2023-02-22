import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import LoginAPI from "../../../api/LoginAPI";
import { setOpenLogin } from "../../../modules/openBool";

const Kakaologin = () => {
  const openLogin = useSelector((state) => state.openBool.login);
  const dispatch = useDispatch();
  const SetOpenLogin = useCallback(
    (bool) => {
      dispatch(setOpenLogin(bool));
    },
    [dispatch]
  );

  // 초기화 -> 로그인 시작
  const { Kakao } = window;
  const initKakao = async () => {
    const appKey = process.env.REACT_APP_APIKEY;
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(appKey);
    }
  };
  useEffect(() => {
    initKakao();
  }, []);

  // 카카오 로그인
  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success(res) {
        LoginAPI(res.access_token);
        SetOpenLogin(true);
        return;
      },
      fail(error) {
        console.log(error);
      },
    });
  };

  // 카카오 로그아웃
  const kakaoLogout = () => {
    Kakao.Auth.logout(() => {
      sessionStorage.clear();
      SetOpenLogin(false);
    });
  };

  return (
    <>
      {!openLogin ? (
        <LoginBtn onClick={kakaoLogin}>카카오 로그인</LoginBtn>
      ) : (
        <LoginBtn onClick={kakaoLogout}>카카오 로그아웃</LoginBtn>
      )}
    </>
  );
};

export default Kakaologin;

const LoginBtn = styled.div`
  @media screen and (min-width: 1000px) {
    border: 1.5px solid #c09567;
    border-radius: 50px;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #c09567;
    box-sizing: border-box;
    text-decoration: none;
    margin-left: 20px;
    box-sizing: border-box;
    cursor: pointer;

    background-color: ${(props) => (props.selected ? "#fff" : "#c09567")};
    color: ${(props) => (props.selected ? "#c09567" : "#fff")};
  }

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

// https://data-jj.tistory.com/53
// https://2mojurmoyang.tistory.com/192
