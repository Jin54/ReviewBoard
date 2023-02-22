import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import LoginAPI from "../../../api/LoginAPI";
import { setOpenLogin, setOpenBookmark } from "../../../modules/openBool";
import { setUserName } from "../../../modules/userData";

import OnClickBookmark from "../OnClickBookmark";

const Kakaologin = () => {
  const openLogin = useSelector((state) => state.openBool.login);
  const dispatch = useDispatch();
  const SetOpenLogin = useCallback(
    (bool) => {
      dispatch(setOpenLogin(bool));
    },
    [dispatch]
  );
  const SetOpenBookmark = useCallback(
    (bool) => {
      dispatch(setOpenBookmark(bool));
    },
    [dispatch]
  );
  const SetUserName = useCallback(
    (name) => {
      dispatch(setUserName(name));
    },
    [dispatch]
  );
  //클릭 후, 즐겨찾기 api 가 호출되어야 한다. bookmarkData
  //없을 경우, 로그인을 하면 즐겨찾기 api 에러가 뜬다.
  const [bookmarkAPI, setBookmarkAPI] = useState(false);

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
        LoginAPI(
          res.access_token,
          (data) => setBookmarkAPI(data),
          (data) => SetUserName(data)
        );
        SetOpenLogin(true);
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
      SetOpenBookmark(false);
      window.location.replace("/");
    });
  };

  return (
    <>
      {!openLogin ? (
        <LoginBtn selected={!openLogin} onClick={kakaoLogin}>
          로그인
        </LoginBtn>
      ) : (
        <>
          <LoginBtn selected={!openLogin} onClick={kakaoLogout}>
            로그아웃
          </LoginBtn>
          {bookmarkAPI && <OnClickBookmark />}
        </>
      )}
    </>
  );
};

export default Kakaologin;

const LoginBtn = styled.div`
  @media screen and (min-width: 1000px) {
    border: 1.5px solid #c09567;
    border-radius: 50px;
    padding: 7px 10px;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #c09567;
    box-sizing: border-box;
    text-decoration: none;
    margin-left: 10px;
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
