//리스트 모달창
import styled from "styled-components";

import ListContent from "./ListContent";

const List = () => {
  return (
    <ListPageWrap>
      <ListContent />
    </ListPageWrap>
  );
};

export default List;

const ListPageWrap = styled.div`
  z-index: 20;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  height: 100%;

  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 60px;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 20px;
    height: 100%;
  }
`;
