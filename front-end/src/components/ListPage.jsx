import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ImgComponent from "./ImageComponent";
import dummy from "./../db/restaurant.json";

import { useDispatch, useSelector } from "react-redux";
import { change } from "../modules/restaurantModal";

const ListPage = ({ detailModalOpen }) => {
  return (
    <ListPageWrap>
      <ListScroll>
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
  flex: 1;
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
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;
const Address = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  width: 50%;
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

function ListContent(detailModalOpen) {
  //가게 클릭 시 해당 가게로 이름 변경 -> 모달창 이동
  const dispatch = useDispatch();
  const onClickSelect = useCallback(
    (name, add) => dispatch(change(name, add)),
    [dispatch]
  );

  //modules/location.js 에 저장된 지역의 음식 리스트만 보여주기
  const [bigLocation, setBigLocation] = useState(
    useSelector((state) => state.location.bigLocation)
  );
  const [smallLocation, setSmallLocation] = useState(
    useSelector((state) => state.location.smallLocation)
  );
  const searchLocationRestaurantList = dummy.restaurants.filter(
    (restaurant) =>
      -1 !== restaurant.add.search(bigLocation) &&
      -1 !== restaurant.add.search(smallLocation)
  );

  return searchLocationRestaurantList.map((restaurant) => (
    <ListContentWrap
      key={restaurant.id}
      onClick={() => {
        onClickSelect(restaurant.title, restaurant.add, restaurant.url, restaurant.scope);
        detailModalOpen();
      }}
    >
      <ImgWrap imgUrl={restaurant.url}>
        {/* <ImgComponent src={"ex01.png"} width={"100%"} /> */}
      </ImgWrap>
      <AboutWrap>
        <Top>
          <Title>{restaurant.title}</Title>
          <Address>{restaurant.add}</Address>
        </Top>
        <Middle>
          <Scope>{restaurant.scope}</Scope>
          <ScopeIcon scope={restaurant.scope} />
        </Middle>
        <Bottom>리뷰 250</Bottom>
      </AboutWrap>
    </ListContentWrap>
  ));
}

// 리뷰 별점
const ScopeIcon = (scope) => {
  const AVR_RATE = scope;
  console.log(AVR_RATE);
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
      let tempStarRatesArr = [0, 0, 0, 0, 0];
      let starVerScore = (AVR_RATE * 70) / 100;
      let idx = 0;
      while (starVerScore > 14) {
          tempStarRatesArr[idx] = 14;
          idx += 1;
          starVerScore -= 14;
      }
      tempStarRatesArr[idx] = starVerScore;
      return tempStarRatesArr;
  };
  useEffect(() => {
      setRatesResArr(calcStarRates)
  }, [])
  return(
    <StarRateWrap>
      {STAR_IDX_ARR.map((item, idx) => {
        return <span className='star_icon' key={`${item}_${idx}`}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='39' viewBox='0 0 14 13' fill='#cacaca'>
                <clipPath id={`${item}StarClip`}>
                    <rect width={`${ratesResArr[idx]}`} height='39' />
                </clipPath>
                <path
                    id={`${item}Star`}
                    d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                    transform='translate(-2 -2)'
                />
                <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#966fd6'
                />
            </svg>
        </span>
      })
      }
    </StarRateWrap>
  )
}
const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  /* margin: 100px 0 0 15px; */
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }    
`