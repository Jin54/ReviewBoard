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

  console.log(mapData)

  if (openBookmark) {
    return (
      <FlexWrap>
        {bookmarkData != null &&
          bookmarkData.map(
            (data, index) =>
              index < pageNum &&
              bookmarkID.includes(data.id) && (
                <ListContentMap data={data} index={index} key={index} />
              )
          )}
        {/* 북마크를 클릭했을 때 사라지지 않게 하기
         (북마크 제외한 나머지 mapData) : api 요청이 한 번 들어오기 때문에, bookmarkData 에는 추가된 값이 없다. 
         bookmarkID 에는 있지만. 
         그래서 그 중간 애들도 보여줘야 한다.*/}
        {mapData.map(
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
            index < pageNum && (
              <ListContentMap data={data} index={index} key={index} />
            )
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
