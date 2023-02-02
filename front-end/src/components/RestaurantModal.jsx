import React from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";
import { useSelector } from "react-redux";

const RestaurantModal = (props) => {
  //매장 상세 정보
  const selectRestaurant = useSelector((state) => state.restaurantModal.name);
  const selectRestaurantDB = dummy.restaurants.filter(
    (restaurant) => restaurant.title === selectRestaurant
  );

  const restaurantDetail = selectRestaurantDB.map((restaurant) => (
    <>
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
    </>
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
`;
// ============
const Divider = styled.div`
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  height: 0.5px;
  background-color: #c09567;
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
`
const ReviewTxtWrap = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ReviewNum = styled.p`
  margin: 0;
  margin-right: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
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
`;

// 매장 상세 리뷰

function ReviewList() {
  const selectRestaurant = useSelector((state) => state.restaurantModal.name);
  const selectRestaurantDB = dummy.reviews.filter(
    (reviews) => reviews.restaurant === selectRestaurant
  );

  // 매장 상세 리뷰 한 개 컴포넌트
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
`

// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 20px;
`;
const Feeling = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
`;
const Date = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
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
`;
