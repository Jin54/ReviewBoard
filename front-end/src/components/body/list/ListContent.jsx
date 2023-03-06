import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ListContentMap from "./ListContentMap";

const ListContent = () => {
  //map 함수 : 보여줄 데이터
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const mapData = useSelector((state) => state.saveData.mapData);
  const bookmarkData = useSelector((state) => state.saveData.bookmarkData);

  // 무한스크롤
  const [pageNum, setPageNum] = useState(0);
  const [bottom, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 20);
  }, [inView]);

  /*
   * FIXME - 1. 함수 선언식을 사용하거나 표현식을 사용하거나 하나의 방식으로 일관성 있게 작성하면 좋을 것 같아요.
   *  2. 어떤 데이터를 return해주는 것인지 함수명에 표현되면 좋을 것 같아요.
   *  예) renderBookmarkList(), renderScrollViewDataList()
   */
  //데이터 보여주는 함수
  function funcData(ListData) {
    if (ListData.length == 0) {
      return <NoList>북마크된 항목이 없습니다.</NoList>;
    }

    return ListData.map(
      (data, index) =>
        index < pageNum && (
          <ListContentMap data={data} index={index} key={index} />
        )
    );
  }

  return (
    <FlexWrap>
      {openBookmark ? funcData(bookmarkData) : funcData(mapData)}
      <ScrollBottomBox ref={bottom} />
    </FlexWrap>
  );
};

export default ListContent;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const NoList = styled.p`
  text-align: center;
  width: 100%;
  color: #00b295;
  font-size: 20px;
`;
const ScrollBottomBox = styled.div`
  height: 10px;
  width: 100px;
  @media screen and (max-width: 430px){
    height: 100px;
  }
`;
