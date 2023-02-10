import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";

import { useDispatch, useSelector } from "react-redux";
import { change } from "../modules/restaurantModal";
import ReviewScope from "./ReviewScope";
import axios from "axios";
import { ListRandom } from "../api/ListRandom";

const ListPage = ({ detailModalOpen }) => {
  // 무한 스크롤
  //  const [randomImageList, setRandomImageList] = useState([]);
  //  const [page, setPage] = useState(1);

  //  const handleScroll = () => {
  //    const scrollHeight = document.documentElement.scrollHeight;
  //    const scrollTop = document.documentElement.scrollTop;
  //    const clientHeight = document.documentElement.clientHeight;

  //    console.log('스크롤 이벤트 발생');

  //    if (scrollTop + clientHeight >= scrollHeight -100) {
  //      console.log('페이지 끝에 스크롤이 닿았음');
  //      setPage((prev) => prev + 1);
  //    }
  //  };

  //  const url = "http://3.35.140.28:9000/shop";

  //  const getRandomImageThenSet = async () => {
  //    console.log('fetching 함수 호출됨');
  //    // try {
  //    //   const { data } = await axios.get(
  //    //     `https://picsum.photos/v2/list?page=${page}&limit=7`
  //    //   );
  //    //   setRandomImageList(randomImageList.concat(data));
  //    // } catch {
  //    //   console.error('fetching error');
  //    // }
  //    try {
  //      const data = await axios({
  //        method: "get",
  //        url: url,
  //      });
  //      setRandomImageList(randomImageList.concat(data));
  //    } catch (err) {
  //      alert(err);
  //    }
  //  };

  //  useEffect(() => {
  //   //  const list = dummy.restaurant.filter(
  //   //    (restaurant, i) => i < page + 8
  //   //  );
  //   //  setRandomImageList((restaurant) => [...list]);
  //    getRandomImageThenSet();
  //  }, []);

  //  // useEffect(() => {
  //  //   console.log('page ? ', page);
  //  //   getRandomImageThenSet();
  //  // }, [page]);

  //  useEffect(() => {
  //    window.addEventListener('scroll', handleScroll);
  //    return () => {
  //      window.removeEventListener('scroll', handleScroll);
  //      console.log('!')
  //    };
  //  }, []);

  // 무한 스크롤

  return (
    <ListPageWrap>
      <ListScroll id="scrollWrap">
        <FlexWrap>{ListContent(detailModalOpen)}</FlexWrap>
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

function ListContent(detailModalOpen) {
  // 무한스크롤

  //전체 음식점 저장
  const [randomData, setRandomData] = useState([]);

  useEffect(() => {
    ListRandom((data) => {
      setRandomData(data);
    });
  }, []);

  // console.log(randomData)

  useEffect(() => {
    if (randomData === null) {
      return;
    }
  });
  //가게 클릭 시 해당 가게로 이름 변경 -> 모달창 이동
  const dispatch = useDispatch();
  const onClickSelect = useCallback((id) => dispatch(change(id)), [dispatch]);

  //modules/location.js 에 저장된 지역의 음식 리스트만 보여주기
  const [bigLocation, setBigLocation] = useState(
    useSelector((state) => state.location.bigLocation)
  );
  const [smallLocation, setSmallLocation] = useState(
    useSelector((state) => state.location.smallLocation)
  );
  // const selectRestaurantId = useSelector(
  //   (state) => state.restaurantModal.id
  // );
  // console.log(randomData[1])

  const searchLocationRestaurantList = randomData.filter(
    (restaurant) =>
      -1 !== restaurant.numberAddress.search(bigLocation) &&
      -1 !== restaurant.numberAddress.search(smallLocation)
  );

  return searchLocationRestaurantList.map((restaurant) => (
    <ListContentWrap
      key={restaurant.id}
      onClick={() => {
        onClickSelect(restaurant.id);
        detailModalOpen();
      }}
    >
      <ImgWrap imgUrl={restaurant.thumbnail}></ImgWrap>
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
  ));
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
// ====== 왼쪽 이미지
const ImgWrap = styled.div`
  height: 100px;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 25px;
  background: url(${(props) => props.imgUrl}) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`;
// ====== 오른쪽 설명
const AboutWrap = styled.div`
  /* flex: 1; */
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
  /* width: 50%; */
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
  margin-right: 6px;
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
