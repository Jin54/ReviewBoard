import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ImgComponent from "./ImageComponent";
import ReviewScope from "./ReviewScope";

import { ReviewAPI } from "../api/Review";
import { useInView } from "react-intersection-observer";

const RestaurantReviewModal = ({ closeAllReview }) => {
  return (
    <RestaurantReviewModalWrap>
      <CloseWrap>
        <Close onClick={closeAllReview}>
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        <ReviewList />
      </Box>
    </RestaurantReviewModalWrap>
  );
};

const RestaurantReviewModalWrap = styled.div`
  height: 85%;
  width: 100%;
  z-index: 30;
  position: absolute;
  left: 0;
  bottom: 0;
  border: 1px solid #c09567;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
  @media screen and (max-width: 1000px) {
    padding-top: 20px;
  }
`;
const Box = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CloseWrap = styled.div`
  &::after {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
  &::before {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
`;
const Close = styled.div`
  width: 17px;
  height: 17px;
  margin-bottom: 30px;
  float: right;
  margin-right: 1%;
  @media screen and (max-width: 1000px) {
    width: 12px;
    height: 12px;
    margin-right: 0;
    padding-right: 0;
  }
`;

export default RestaurantReviewModal;

// 매장 상세 리뷰
const ReviewList = () => {
  return (
    <ReviewListWrap>
      <ReviewComponent />
    </ReviewListWrap>
  );
};

const ReviewListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// 매장 상세 리뷰 한 개 컴포넌트
const ReviewComponent = () => {
  const restaurantID = useSelector((state) => state.restaurantModal.id);
  const [reviewData, setReviewData] = useState(null);
  const [pageNum, setPageNum] = useState(10);
  const showURL = useSelector((state) => state.urlChange.name);

  //무한 스크롤 : 라이브러리 react-intersection-observer
  const [ref, inView] = useInView();
  useEffect(() => {
    setPageNum(pageNum + 10);
  }, [ref, inView]);

  useEffect(() => {
    ReviewAPI(
      (data) => {
        setReviewData(data);
      },
      restaurantID,
      pageNum,
      showURL
    );
    //주의 : console.log(reviewData) 이렇게 해도 reviewData 는 null 로 나온다. useEffect 밖에서 console 해줘야 한다.
  }, [restaurantID, pageNum, showURL]);

  if (reviewData === null) {
    return <ReviewBox>리뷰 없음</ReviewBox>;
  }

  return (
    <ReviewListWrap>
      {reviewData.map((review) => (
        <ReviewBox key={review.id}>
          <Top>
            <Feeling>{review.content}</Feeling>
            <Date>{review.createAT}</Date>
          </Top>
          <Middle>
            <ReviewScopeNum>{review.rating}</ReviewScopeNum>
            <ReviewScope scope={review.rating} />
          </Middle>
          <Bottom>{review.content}</Bottom>
        </ReviewBox>
      ))}
      <div ref={ref}></div>
    </ReviewListWrap>
  );
};

const ReviewBox = styled.div`
  border: 1px solid #c09567;
  border-radius: 10px;
  width: 49%;
  margin-bottom: 2%;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    padding: 15px;
  }
`;
// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 20px;
  /* display: flex;
  align-items: baseline; */
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
    display: flex;
  }
`;
const Feeling = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
  }
`;
const Date = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
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
`;
const ReviewScopeNum = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 6px;
`;
// 리뷰
const Bottom = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  margin: 0;
  @media screen and (max-width: 1000px) {
    margin: 0;
    font-size: 11px;
  }
`;
