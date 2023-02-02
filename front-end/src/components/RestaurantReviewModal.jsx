import React from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";
import { useSelector } from "react-redux";

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
  height: 80%;
  /* position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20; */
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

// 모달창 밖을 눌렀을 때 모달창 지우기 위한 컴포넌트
const Back = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
  align-items: flex-start;
`;

// 매장 상세 리뷰 한 개 컴포넌트
const ReviewComponent = () => {
  const selectRestaurant = useSelector((state) => state.restaurantModal.name);
  const selectRestaurantDB = dummy.reviews.filter(
    (reviews) => reviews.restaurant === selectRestaurant
  );

  return selectRestaurantDB.map((review) => (
    <ReviewBox>
      <Top>
        <Feeling>{review.title}</Feeling>
        <Date>{review.date}</Date>
      </Top>
      <Middle>
        <ReviewScope>{review.scope}</ReviewScope>
        <ReviewScopeIConWrap></ReviewScopeIConWrap>
      </Middle>
      <Bottom>{review.post}</Bottom>
    </ReviewBox>
  ));
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
  display: flex;
  align-items: baseline;
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
`;
const ReviewScope = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;
const ReviewScopeIConWrap = styled.div``;
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
