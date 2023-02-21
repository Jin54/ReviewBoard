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
    console.log(loginCode);
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
        <div
          onClick={() => {
            openLogin ? SetOpenLogin(false) : requestLogin();
          }}
        >
          로그인
        </div>
      ) : (
        <div
          onClick={() => {
            SetOpenLogin(false);
            SetOpenBookmark(false);
            ResetBookmarkID(null);
            setLoginCode();
          }}
        >
          로그아웃
        </div>
      )}
    </>
  );
};

export default LoginBtn;
