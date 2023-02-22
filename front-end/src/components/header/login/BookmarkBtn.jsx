import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenBookmark } from "../../../modules/openBool";

const BookmarkBtn = () => {
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const openLogin = useSelector((state) => state.openBool.login);
  const openMobileMenu = useSelector((state) => state.openBool.mobileMenu);
  const dispatch = useDispatch();
  const SetOpenBookmark = useCallback(
    (bool) => {
      dispatch(setOpenBookmark(bool));
    },
    [dispatch]
  );

  return (
    <>
      <WebBtn
        selected={openBookmark}
        onClick={() => {
          openLogin
            ? SetOpenBookmark(!openBookmark)
            : alert("로그인을 해주세요.");
        }}
      >
        즐겨찾기
      </WebBtn>
    </>
  );
};

export default BookmarkBtn;

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
