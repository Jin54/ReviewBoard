//리스트 보기
import { useSelector } from "react-redux";
import styled from "styled-components";

import ListContent from "./ListContent";

const ListPage = (props) => {
  //리스트 보기
  const showList = useSelector((state) => state.showList.bool);
  if (props.mapData === null) return;

  console.log("리스트 보기 페이지 Open");
  console.log(showList);
  return (
    <ListPageWrap showList={showList}>
      <ListScroll>
        <ListContent mapData={props.mapData} setMapData={props.setMapData} />
      </ListScroll>
    </ListPageWrap>
  );
};

export default ListPage;

const ListPageWrap = styled.div`
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
const ListScroll = styled.div`
  @media screen and (max-width: 1000px) {
    display: block;
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
