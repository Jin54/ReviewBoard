import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom"
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './OAuth';

const Kakaologin = () => {

  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { Kakao } = window;

  const initKakao = async () => {
    const jsKey = "3c5fd0d61672a00438664be501823461";
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(jsKey);
      console.log(`kakao 초기화 ${Kakao.isInitialized()}`);
    }
  };

  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success(res) {
        console.log(res);
        Kakao.Auth.setAccessToken(res.access_token);
        console.log("카카오 로그인 성공");

        Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            console.log("카카오 인가 요청 성공");
            setIsLogin(true);
            const kakaoAccount = res.kakao_account;
            localStorage.setItem("email", kakaoAccount.email);
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        console.log(error);
      },
    });
    };

    const kakaoLogout = () => {
        Kakao.Auth.logout((res) => {
          console.log(Kakao.Auth.getAccessToken());
          console.log(res);
          localStorage.removeItem("email");
          localStorage.removeItem("profileImg");
          localStorage.removeItem("nickname");
          setUser(null);
        });
      };
    
      useEffect(() => {
        initKakao();
        Kakao.Auth.getAccessToken() ? setIsLogin(true) : setIsLogin(false);
      }, []);
    
      useEffect(() => {
        console.log(isLogin);
        if (isLogin) {
          setUser({
            email: localStorage.getItem("email"),
          });
        }
      }, [isLogin]);

    return (
        <Login>
        {user ? <LoginBtn onClick={kakaoLogout}>로그아웃</LoginBtn> : <LoginBtn onClick={kakaoLogin}>로그인</LoginBtn>}
        </Login>
    )
}
console.log(window.location.href)

const Login = styled.div``

const LoginBtn = styled.a`
  border: 1.5px solid #c09567;
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #c09567;
  /* width: 100px; */
  box-sizing: border-box;
  text-decoration: none;
  margin-left: 20px;
  box-sizing: border-box;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Kakaologin;

// https://data-jj.tistory.com/53

// https://2mojurmoyang.tistory.com/192
