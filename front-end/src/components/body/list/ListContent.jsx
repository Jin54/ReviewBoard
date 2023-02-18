import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReviewScope from "./ReviewScope";
import { setDetailID } from "../../../modules/saveData";
import { addBookmark, deleteBookmark } from "../../../modules/bookmark";

const ListContent = (props) => {
  const mapData = useSelector((state) => state.saveData.mapData);
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();
  const SetDetailID = useCallback(
    (id) => dispatch(setDetailID(id)),
    [dispatch]
  );
  const AddBookmark = useCallback(
    (id) => dispatch(addBookmark(id)),
    [dispatch]
  );
  const DeleteBookmark = useCallback(
    (id) => dispatch(deleteBookmark(id)),
    [dispatch]
  );

  // 무한스크롤
  const [pageNum, setPageNum] = useState(0);
  const [bottom, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [inView]);

  if (mapData == null) return;

  return (
    <FlexWrap>
      {mapData.map(
        (data, index) =>
          index < pageNum && (
            <ListContentWrap
              key={index}
              onClick={() => {
                SetDetailID(data.id);
                props.setOpenDetailModal(true);
              }}
            >
              <ImgBox>
                <ImgWrap imgUrl={data.thumbnail}></ImgWrap>
              </ImgBox>
              <AboutWrap>
                <Top>
                  <TopTitle>
                    <Title>{data.name}</Title>
                    <BookMark
                      bookmarkColor={
                        bookmark.includes(data.id) ? "blue" : "red"
                      }
                      onClick={(e) => {
                        bookmark.includes(data.id)
                          ? DeleteBookmark(data.id)
                          : AddBookmark(data.id);

                          e.stopPropagation();
                      }}
                    />
                  </TopTitle>
                  <Address>{data.numberAddress}</Address>
                </Top>
                <Middle>
                  <Scope>{data.review_rating}</Scope>
                  <ReviewScope scope={data.review_rating} />
                </Middle>
                <Bottom>리뷰 {data.review_number}</Bottom>
              </AboutWrap>
            </ListContentWrap>
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

const ListContentWrap = styled.div`
  background: #ffffff;
  border: 1px solid #c09567;
  border-radius: 10px;
  width: 49%;
  margin-bottom: 2%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
// 왼쪽 이미지
const ImgBox = styled.div`
  width: 40%;
  /* background-color: #c09567; */
  background-color: white;
  border-radius: 10px;
  margin-right: 25px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`;
const ImgWrap = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${(props) => props.imgUrl}) no-repeat center;
  background-size: cover;
`;
// 오른쪽 설명
const AboutWrap = styled.div`
  width: 50%;
  @media screen and (max-width: 1000px) {
    flex: 0;
    width: 100%;
    margin-top: 10px;
  }
`;
// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
  }
`;
const TopTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;
const BookMark = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.bookmarkColor};
`;
const Address = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 1000px) {
    font-size: 11px;
    width: 100%;
  }
`;
// 별점 & 아이콘
const Middle = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1500px) and (min-width: 1000px) {
    width: 110%;
  }
  @media screen and (max-width: 999px) and (min-width: 600px) {
    width: 70%;
  }
  @media screen and (max-width: 599px) and (min-width: 470px) {
    width: 90%;
  }
  @media screen and (max-width: 469px) {
    width: 100%;
  }
`;
const Scope = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 16px;
  @media screen and (max-width: 1500px) and (min-width: 1000px) {
    font-size: 16px;
    margin-right: 8px;
  }
  @media screen and (max-width: 999px) {
    margin-right: 5px;
  }
`;

// 리뷰 개수
const Bottom = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  @media screen and (max-width: 1000px) {
    margin: 0;
    font-size: 11px;
  }
`;
