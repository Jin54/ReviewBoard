import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenBookmark, setOpenMobileMenu } from "../../../modules/openBool";

const BookmarkBtn = () => {
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const openLogin = useSelector((state) => state.openBool.login);
  const dispatch = useDispatch();
  const SetOpenBookmark = useCallback(
    (bool) => {
      dispatch(setOpenBookmark(bool));
    },
    [dispatch]
  );
  const SetOpenMobileMenu = useCallback(
    (bool) => dispatch(setOpenMobileMenu(bool)),
    [dispatch]
  );

  return (
    <div
      selected={openBookmark}
      onClick={() => {
        openLogin
          ? SetOpenBookmark(!openBookmark)
          : alert("로그인을 해주세요.");
      }}
    >
      즐겨찾기
    </div>
  );
};

export default BookmarkBtn;
