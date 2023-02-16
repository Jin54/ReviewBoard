import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// components import
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import RestaurantModal from "../components/RestaurantModal";
import RestaurantReviewModal from "../components/RestaurantReviewModal";

//redux
import { modalopen } from "../modules/restaurantModal";
import { openListPage, closeListPage } from "../modules/showList";

const Index = () => {
  console.log("Index 실행");
  // 매장 상세 보기
  const modalOpenBool = useSelector((state) => state.restaurantModal.open);
  const dispatch = useDispatch();
  const modalOpen = useCallback(
    (bool) => dispatch(modalopen(bool)),
    [dispatch]
  );
  const detailModalClose = () => {
    modalOpen(false);
  };

  // 더보기 클릭 시 전체 리뷰 모달
  const [allReview, setAllReview] = useState(false);
  const openAllReivew = () => {
    setAllReview(true);
  };
  const closeAllReview = () => {
    setAllReview(false);
  };

  return (
    <IndexWrap>
      <Header />
      <MapOrList />
      <Body />
      {modalOpenBool && (
        <RestaurantModal
          detailModalClose={detailModalClose}
          openAllReivew={openAllReivew}
        />
      )}
      {allReview && <RestaurantReviewModal closeAllReview={closeAllReview} />}
      <Footer />
    </IndexWrap>
  );
};

const IndexWrap = styled.div`
  padding-right: 5%;
  position: relative;
  padding-left: 5%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    padding-left: 8%;
    padding-right: 8%;
  }
`;
export default Index;

// 지도보기 & 리스트보기 버튼

const MapOrList = (props) => {
  //리스트 보여주기 - 지도는 항상 뒤에 있음 (리렌더링 방지)
  const showList = useSelector((state) => state.showList.bool);
  const dispatch = useDispatch();
  const OpenListPage = useCallback(() => dispatch(openListPage()), [dispatch]);
  const CloseListPage = useCallback(
    () => dispatch(closeListPage()),
    [dispatch]
  );

  return (
    <MapOrListWrap>
      <MapBtn onClick={CloseListPage} selected={showList === false}>
        지도보기
      </MapBtn>
      <ListBtn onClick={OpenListPage} selected={showList === true}>
        리스트보기
      </ListBtn>
    </MapOrListWrap>
  );
};

const MapOrListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: auto;
  margin-top: 40px;
  flex: 0;
`;
const MapBtn = styled.p`
  margin: 0;
  margin-right: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => (props.selected ? "#000" : "#999")};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;
const ListBtn = styled.p`
  margin: 0;
  margin-left: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => (props.selected ? "#000" : "#999")};
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;
