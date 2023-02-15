import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import ImgComponent from "./ImageComponent";
import ReviewScope from "./ReviewScope";

import { RestaurantModalAPI } from "../api/RestaurantModalAPI";
import ReviewAPI from "../api/Review";

const RestaurantModal = (props) => {
  const [listData, setListData] = useState([]);
  const selectRestaurantId = useSelector((state) => state.restaurantModal.id);
  const showURL = useSelector((state) => state.urlChange.name);

  useEffect(() => {
    RestaurantModalAPI(
      (data) => {
        setListData(data);
      },
      selectRestaurantId,
      showURL
    );
  }, [selectRestaurantId, showURL]);

  if (listData === null) {
    return;
  }
  console.log("매장 데이터 렌더링");

  return (
    <RestaurantModalWrap>
      <CloseWrap>
        <Close onClick={props.detailModalClose}>
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        <div key={listData.id}>
          <MainImg>
            <Thumbnail src={listData.thumbnail} width={"100%"} />
          </MainImg>
          <About>
            <Title>{listData.name}</Title>
            <Address>{listData.numberAddress}</Address>
            <ScopeWrap>
              <Scope>{listData.review_rating}</Scope>
              <ReviewScope scope={listData.review_rating} />
            </ScopeWrap>
          </About>
          <Info>
            <InfoComponent img={"time.png"} txt={listData.time} />
            <InfoComponent img={"sort.png"} txt={listData.number} />
            <InfoComponent img={"phone.png"} txt={listData.sort} />
          </Info>
        </div>
        <Divider></Divider>
        <ReviewWrap>
          <ReviewTxtWrap>
            <ReviewNum>리뷰 {listData.review_number}개</ReviewNum>
            {!(listData.review_number === 0) && (
              <ReviewMore onClick={props.openAllReivew}>더보기</ReviewMore>
            )}
          </ReviewTxtWrap>
          <ReviewList reviewNum={listData.review_number} />
        </ReviewWrap>
      </Box>
    </RestaurantModalWrap>
  );
};

const RestaurantModalWrap = styled.div`
  height: 85%;
  width: 100%;
  z-index: 20;
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

const Thumbnail = styled.img``;

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

const MainImg = styled.div`
  background-color: #c09567;
  border-radius: 10px;
  width: 80%;
  margin: auto;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    height: 140px;
    width: 90%;
  }
`;
const About = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin: 0;
`;
const Address = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
`;
const ScopeWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 30%;
`;
const Scope = styled.p`
  margin: 0;
  margin-right: 20px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;
//=============
const Info = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;
// ============
const Divider = styled.div`
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  height: 0.5px;
  background-color: #c09567;
  @media screen and (max-width: 1000px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;
// =============

const ReviewWrap = styled.div`
  width: 100%;
`;
const ReviewFlexWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ReviewTxtWrap = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;
const ReviewNum = styled.p`
  margin: 0;
  margin-right: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;
const ReviewMore = styled.p`
  margin: 0;
  background: #c09567;
  border: 1px solid #c09567;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    padding: 8px;
  }
`;
export default RestaurantModal;

// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )

const InfoComponent = (props) => {
  if (props.sort == null) return;
  return (
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={"100%"} />
      </InfoIcon>
      {props.txt ? (
        <InfoTxt>{props.txt}</InfoTxt>
      ) : (
        <InfoTxt>정보가 존재하지 않습니다.</InfoTxt>
      )}
    </InfoWrap>
  );
};

const InfoWrap = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1000px) {
    margin-bottom: 10px;
  }
`;
const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 10px;
`;
const InfoTxt = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

// 매장 상세 리뷰

const ReviewList = (reviewNum) => {
  const [pageNum, setPageNum] = useState(0);
  const [reviewData, setReviewData] = useState(null);

  //무한 스크롤 : 라이브러리 react-intersection-observer
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [ref, inView]);

  const restaurantID = useSelector((state) => state.restaurantModal.id);
  const showURL = useSelector((state) => state.urlChange.name);

  useEffect(() => {
    if (pageNum === 0) return;
    if (restaurantID === "") return;
    ReviewAPI(
      (data) => {
        setReviewData(data);
      },
      restaurantID,
      pageNum,
      showURL
    );
  }, [restaurantID, pageNum, showURL]);

  if (reviewData === null || undefined || reviewNum === 0) {
    return (
      <>
        <ReviewNone>리뷰 없음</ReviewNone>
        <div ref={ref} style={{ height: "100px", width: "100px" }}></div>
      </>
    );
  }

  // 매장 상세 리뷰 한 개 컴포넌트
  return (
    <ReviewFlexWrap>
      {reviewData.map((review) => (
        <ReviewBox key={review.id}>
          <Top>
            <Feeling scope={review.rating} />
            <Date>{review.createAT}</Date>
          </Top>
          <Middle>
            <ReviewScopeNum>{review.rating}</ReviewScopeNum>
            {!(review.rating == null || undefined) && (
              <ReviewScope scope={review.rating} />
            )}
          </Middle>
          <Bottom>{review.content}</Bottom>
        </ReviewBox>
      ))}
      <div ref={ref} style={{ height: "100px", width: "100px" }}></div>
    </ReviewFlexWrap>
  );
};

const ReviewNone = styled.p`
  color: #c09567;
  text-align: center;
  font-size: 20px;
  padding-top: 20px;
`;

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
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
    display: flex;
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
  width: 45%;
`;
const ReviewScopeNum = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
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

const Feeling = ({ scope }) => {
  function txt(scope) {
    if (scope >= 4.5) {
      return "정말 맛있어요!";
    } else if (scope < 4.5 && scope >= 3.5) {
      return "맛있어요!";
    } else if (scope < 3.5 && scope >= 2.5) {
      return "괜찮아요!";
    } else if (scope < 2.5 && scope >= 1.5) {
      return "그저 그래요";
    } else if (scope == null) {
      return "별점을 주지 않았습니다";
    } else {
      return "별로예요";
    }
  }
  return <FeelingWrap>{txt(scope)}</FeelingWrap>;
};
const FeelingWrap = styled.span`
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
