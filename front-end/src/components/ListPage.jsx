import React from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";

const ListPage = ({ detailModalOpen }) => {
  return (
    <ListPageWrap>
      <FlexWrap>{ListContent(detailModalOpen)}</FlexWrap>
    </ListPageWrap>
  );
};

const ListPageWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 100px;
  flex: 1;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

export default ListPage;

// const ListContent = (props) => {
// return (
//   <ListContentWrap onClick={props.onClick}>
//     <ImgWrap>
//       <ImgComponent src={"ex01.png"} width={"100%"} />
//     </ImgWrap>
//     {RestaurantList}
//   </ListContentWrap>
// );
// };

const ListContentWrap = styled.div`
  background: #ffffff;
  border: 1px solid #c09567;
  border-radius: 10px;
  width: 49%;
  margin-bottom: 2.5%;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
// ====== 왼쪽 이미지
const ImgWrap = styled.div`
  height: 150px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 25px;
`;
// ====== 오른쪽 설명
const AboutWrap = styled.div`
  flex: 1;
`;
// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: baseline;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #000000;
  margin-right: 10px;
`;
const Address = styled.span`
  font-weight: 400;
  font-size: 15px;
  color: #999999;
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
// 별점 & 아이콘
const Middle = styled.div`
  margin-bottom: 20px;
`;
const Scope = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: #000000;
`;
const ScopeIConWrap = styled.div``;
// 리뷰 개수
const Bottom = styled.p`
  font-weight: 400;
  font-size: 20px;
  color: #999999;
`;

function ListContent(detailModalOpen) {
  return dummy.restaurant.map((restaurant) => (
    <ListContentWrap onClick={detailModalOpen}>
      <ImgWrap>
        <ImgComponent src={restaurant.img} width={"100%"} />
      </ImgWrap>
      <AboutWrap>
        <Top>
          <Title>{restaurant.title}</Title>
          <Address>{restaurant.add}</Address>
        </Top>
        <Middle>
          <Scope>{restaurant.scope}</Scope>
          <ScopeIConWrap></ScopeIConWrap>
        </Middle>
        <Bottom>리뷰 {restaurant.reviewNum}</Bottom>
      </AboutWrap>
    </ListContentWrap>
  ));
}
