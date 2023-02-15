import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import { change } from "../modules/restaurantModal";
import ReviewScope from "./ReviewScope";

import { ListAll } from "../api/ListAll";
import { SearchRestaurantAPI } from "../api/SearchRestaurantAPI";
import { modalopen } from "../modules/restaurantModal";

const ListPage = () => {
  console.log("리스트 데이터 렌더링");
  return (
    <ListPageWrap>
      <ListScroll>
        <ListContent />
      </ListScroll>
    </ListPageWrap>
  );
};

const ListPageWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 60px;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 20px;
    height: 100%;
  }
`;
const ListScroll = styled.div`
  @media screen and (max-width: 1000px) {
    display: block;
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;
export default ListPage;

// =============================================

function ListContent() {
  // useEffect(()=> {
  //   console.log('제발 돼')
  // },[])
  // console.log('매장 모달 한 개 렌더링')
  // 무한스크롤
  const [pageNum, setPageNum] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [ref, inView]);

  //전체 음식점 저장
  const [restaurantData, setRestaurantData] = useState([]);
  const showURL = useSelector((state) => state.urlChange.name);

  useEffect(() => {
    if (bigLocation !== "") return;
    if (pageNum === 0) return;

    ListAll(
      (data) => {
        setRestaurantData(data);
      },
      pageNum,
      showURL
    );
  }, [pageNum, showURL]);
  console.log(restaurantData);

  //가게 클릭 시 해당 가게로 이름 변경 -> 모달창 이동
  const dispatch = useDispatch();
  const onClickSelect = useCallback((id) => dispatch(change(id)), [dispatch]);
  const modalOpen = useCallback(
    (bool) => dispatch(modalopen(bool)),
    [dispatch]
  );

  //modules/location.js 에 저장된 지역의 음식 리스트만 보여주기
  const [bigLocation, setBigLocation] = useState(
    useSelector((state) => state.location.bigLocation)
  );
  const [smallLocation, setSmallLocation] = useState(
    useSelector((state) => state.location.smallLocation)
  );

  //지역 검색시, 해당 지역의 음식점만 조회
  useEffect(() => {
    if (smallLocation === "") return;
    if (pageNum === 0) return;

    SearchRestaurantAPI(
      bigLocation,
      smallLocation,
      (data) => {
        setRestaurantData(data);
      },
      pageNum,
      showURL
    );
  }, [smallLocation, pageNum, showURL]);

  if (restaurantData === []) return;

  return (
    <FlexWrap>
      {restaurantData.map((restaurant) => (
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
      ))}
      <div ref={ref} style={{ height: "100px", width: "100px" }}></div>
    </FlexWrap>
  );
}

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
  background-color: #c09567;
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
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
  }
`;
const Scope = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 16px;
  @media screen and (max-width: 1000px) {
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
