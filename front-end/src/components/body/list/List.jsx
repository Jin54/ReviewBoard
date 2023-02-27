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
  background-color: #fafafa;
  height: 85%;
  width: 70%;
  box-sizing: border-box;
  border-radius: 10px;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 180px;
    height: 100%;
    padding: 0px 5%;
  }
`;
