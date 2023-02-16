import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import { modalopen } from "../../modules/restaurantModal";
import { change } from "../../modules/restaurantModal";
import ReviewScope from "../ReviewScope";

const ListContent = (props) => {
  // 무한스크롤
  const [pageNum, setPageNum] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [ref, inView]);

  //가게 클릭 시 해당 가게로 이름 변경 -> 모달창 이동
  const dispatch = useDispatch();
  const onClickSelect = useCallback((id) => dispatch(change(id)), [dispatch]);
  const modalOpen = useCallback(
    (bool) => dispatch(modalopen(bool)),
    [dispatch]
  );

  if (props.mapData == null) return;
  return (
    <FlexWrap>
      {props.mapData.map((restaurant, index) =>
        index < pageNum ? (
          <ListContentWrap
            key={restaurant.id}
            onClick={() => {
              onClickSelect(restaurant.id);
              modalOpen(true);
            }}
          >
            <ImgBox>
              <ImgWrap imgUrl={restaurant.thumbnail}></ImgWrap>
            </ImgBox>
            <AboutWrap>
              <Top>
                <Title>{restaurant.name}</Title>
                <Address>{restaurant.numberAddress}</Address>
              </Top>
              <Middle>
                <Scope>{restaurant.review_rating}</Scope>
                <ReviewScope scope={restaurant.review_rating} />
              </Middle>
              <Bottom>리뷰 {restaurant.review_number}</Bottom>
            </AboutWrap>
          </ListContentWrap>
        ) : (
          ""
        )
      )}
      <div ref={ref} style={{ height: "10px", width: "10px" }}></div>
    </FlexWrap>
  );
};

export default ListContent;

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
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
  }
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
const Address = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;
