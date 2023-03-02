import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setOpenBookmark } from "../../../modules/openBool";

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
  border: 1.5px solid #fafafa;
  border-radius: 50px;
  padding: 7px 10px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #00B295;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#fafafa" : "#00B295")};
  color: ${(props) => (props.selected ? "#00B295" : "#fafafa")};
  transition: 0.2s ease-in;
    &:hover{
      box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
    }
  @media screen and (max-width: 1000px) {
  border: none;
  text-align: right;
  background-color: #00B295;
  color: #fafafa;
  padding: 0;
  font-weight: ${(props) => (props.selected ? "700" : "300")};
  }

`;
