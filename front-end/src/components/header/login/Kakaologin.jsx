import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setKakaoToken } from "../../../modules/token";
import { KAKAO_AUTH_URL } from "./OAuth";
import LoginAPI from "../../../api/LoginAPI";

const Kakaologin = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { Kakao } = window;

  const dispatch = useDispatch();
  const SetKakaoToken = useCallback((data) => dispatch(setKakaoToken(data)), [dispatch]);

  // 초기화
  const initKakao = async () => {
    const appKey = process.env.REACT_APP_APIKEY;
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(appKey);
      console.log(`kakao 초기화 ${Kakao.isInitialized()}`);
    }
  };

  // 카카오 로그인
  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success(res) {
        LoginAPI(res.access_token, SetKakaoToken);
        setUser(true);
      },
      fail(error) {
        console.log(error);
      },
    });
  };

  // 카카오 로그아웃
  const kakaoLogout = () => {
    Kakao.Auth.logout((res) => {
      setUser(null);
      LoginAPI(res.access_token, SetKakaoToken)
      console.log('카카오 로그아웃')
    });
  };

  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    if (isLogin) {
      setUser({
        email: localStorage.getItem("email"),
      });
    }
  }, [isLogin]);

  return (
    <Login>
      {user ? (
        <LoginBtn onClick={kakaoLogout}>카카오 로그아웃</LoginBtn>
      ) : (
        <LoginBtn onClick={kakaoLogin}>카카오 로그인</LoginBtn>
      )}
    </Login>
  );
};
// console.log(window.location.href)

const Login = styled.div``;

const LoginBtn = styled.a`
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

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default Kakaologin;

// https://data-jj.tistory.com/53

// https://2mojurmoyang.tistory.com/192
