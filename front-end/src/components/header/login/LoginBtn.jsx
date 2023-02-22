import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  setOpenBookmark,
  setOpenLogin,
  setOpenMobileMenu,
} from "../../../modules/openBool";
import { resetBookmarkID } from "../../../modules/bookmarkID";
import LoginAPI from "../../../api/LoginAPI";

const LoginBtn = () => {
  const openLogin = useSelector((state) => state.openBool.login);
  const token = useSelector((state) => state.token.kakao);
  const showURL = useSelector((state) => state.urlChange.name);

  const dispatch = useDispatch();
  const SetOpenBookmark = useCallback(
    (bool) => {
      dispatch(setOpenBookmark(bool));
    },
    [dispatch]
  );
  const SetOpenLogin = useCallback(
    (bool) => {
      dispatch(setOpenLogin(bool));
    },
    [dispatch]
  );
  const ResetBookmarkID = useCallback(() => {
    dispatch(resetBookmarkID());
  }, [dispatch]);
  const [loginCode, setLoginCode] = useState();
  const SetOpenMobileMenu = useCallback(
    (bool) => dispatch(setOpenMobileMenu(bool)),
    [dispatch]
  );

  //로그인 유무로 북마크 활성화
  function requestLogin() {
    LoginAPI(showURL, token, (data) => setLoginCode(data));
  }
  useEffect(() => {
    if (loginCode == null) return;
    else if (loginCode == 200) {
      SetOpenLogin(true);
      SetOpenMobileMenu(false);
    } else {
      alert("로그인에 실패하였습니다.");
      SetOpenMobileMenu(false);
    }
  }, [loginCode]);

  return (
    <>
      {!openLogin ? (
        <WebBtn
          selected={!openLogin}
          onClick={() => {
            openLogin ? SetOpenLogin(false) : requestLogin();
          }}
        >
          로그인
        </WebBtn>
      ) : (
        <WebBtn
          selected={!openLogin}
          onClick={() => {
            SetOpenLogin(false);
            SetOpenBookmark(false);
            ResetBookmarkID(null);
            setLoginCode();
          }}
        >
          로그아웃
        </WebBtn>
      )}
    </>
  );
};

export default LoginBtn;

const WebBtn = styled.div`
  @media screen and (min-width: 1000px) {
    border: 1.5px solid #c09567;
    border-radius: 50px;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 14px;
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
