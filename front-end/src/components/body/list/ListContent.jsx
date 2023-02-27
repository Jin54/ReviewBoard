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
    setPageNum(pageNum + 10);
  }, [inView]);

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
      <div ref={bottom} style={{ height: "10px", width: "100px" }} />
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
  color: #00B295;
  font-size: 20px;
`