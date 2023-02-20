import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ListContentMap from "./ListContentMap";

const ListContent = (props) => {
  //map 함수 : 보여줄 데이터
  const openBookmark = useSelector((state) => state.openBool.bookmark);
  const mapData = useSelector((state) => state.saveData.mapData);
  const bookmarkData = useSelector((state) => state.saveData.bookmarkData);
  const bookmarkID = useSelector((state) => state.bookmarkID);

  // 무한스크롤
  const [pageNum, setPageNum] = useState(0);
  const [bottom, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [inView]);

  if (mapData == null) {
    return <FlexWrap>목록 없음</FlexWrap>;
  }

  if (openBookmark) {
    return (
      <FlexWrap>
        {openBookmark &&
          bookmarkData != null &&
          bookmarkData.map(
            (data, index) =>
              index < pageNum &&
              bookmarkID.includes(data.id) && (
                <ListContentMap data={data} index={index} key={index} />
              )
          )}
        {mapData.map(
          (data, index) =>
            index < pageNum &&
            !bookmarkID.includes(data.id) && (
              <ListContentMap data={data} index={index} key={index} />
            )
        )}
        <div ref={bottom} style={{ height: "10px", width: "100px" }}></div>
      </FlexWrap>
    );
  } else
    return (
      <FlexWrap>
        {mapData.map(
          (data, index) =>
            index < pageNum && <ListContentMap data={data} index={index} />
        )}
        <div ref={bottom} style={{ height: "10px", width: "100px" }}></div>
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
