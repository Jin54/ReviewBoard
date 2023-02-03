import React from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";
import { useSelector } from "react-redux";

const RestaurantModal = (props) => {
  //매장 상세 정보
  const selectRestaurantName = useSelector(
    (state) => state.restaurantModal.name
  );
  const selectRestaurantAdd = useSelector((state) => state.restaurantModal.add);
  const selectRestaurantDB = dummy.restaurants.filter(
    (restaurant) =>
      restaurant.title === selectRestaurantName &&
      restaurant.add === selectRestaurantAdd
  );

  const restaurantDetail = selectRestaurantDB.map((restaurant) => (
    <div key={restaurant.id}>
      <MainImg>
        <ImgComponent src={restaurant.img} width={"100%"} />
      </MainImg>
      <About>
        <Title>{restaurant.title}</Title>
        <Address>{restaurant.add}</Address>
        <ScopeWrap>
          <Scope>{restaurant.scope}</Scope>
          <ScopeIConWrap></ScopeIConWrap>
        </ScopeWrap>
      </About>
      <Info>
        <InfoComponent img={"time.png"} txt={restaurant.time} />
        <InfoComponent img={"link.png"} txt={restaurant.link} />
        <InfoComponent img={"phone.png"} txt={restaurant.phone} />
      </Info>
    </div>
  ));

  return (
    <RestaurantModalWrap>
      <CloseWrap>
        <Close onClick={props.detailModalClose}>
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        {/* <Back></Back>  */}
        {restaurantDetail}
        <Divider></Divider>
        <ReviewPage onClick={props.openAllReivew} />
      </Box>
    </RestaurantModalWrap>
  );
};

const RestaurantModalWrap = styled.div`
  height: 85%;
  width: 100%;
  /* position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    */
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
`;
const Scope = styled.p`
  margin: 0;
  margin-right: 20px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;
const ScopeIConWrap = styled.div`
  display: flex;
  align-items: center;
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
export default RestaurantModal;

// 매장 상세 하단 리뷰 전체 컴포넌트 ( 리뷰 개수, 더보기 버튼, 리뷰 리스트 )
const ReviewPage = (props) => {
  const reviewNum = useSelector((state) => state.restaurantModal.reviewNum);

  return (
    <ReviewWrap>
      <ReviewTxtWrap>
        <ReviewNum>리뷰 {reviewNum}개</ReviewNum>
        <ReviewMore onClick={props.onClick}>더보기</ReviewMore>
      </ReviewTxtWrap>
      <ReviewFlexWrap>
        <ReviewList />
      </ReviewFlexWrap>
    </ReviewWrap>
  );
};

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

// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )

const InfoComponent = (props) => {
  return (
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={"100%"} />
      </InfoIcon>
      <InfoTxt>{props.txt}</InfoTxt>
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

function ReviewList() {
  const selectRestaurantName = useSelector(
    (state) => state.restaurantModal.name
  );
  const selectRestaurantAdd = useSelector((state) => state.restaurantModal.add);
  const selectRestaurantDB = dummy.reviews.filter(
    (reviews) =>
      reviews.restaurant === selectRestaurantName &&
      reviews.add === selectRestaurantAdd
  );

  // 매장 상세 리뷰 한 개 컴포넌트
  return selectRestaurantDB.map((review) => (
    <ReviewBox key={review.id}>
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
}

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
