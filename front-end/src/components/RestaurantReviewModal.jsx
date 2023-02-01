import React, { useState } from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

// Body 컴포넌트 안에 있는 RegionListModal 컴포넌트 css 참고하기

const RestaurantReviewModal = ({closeAllReview}) => {

  return (
    <RestaurantReviewModalWrap>
      <CloseWrap>
        <Close onClick={closeAllReview}>
          <ImgComponent src={'close.png'} width={'100%'} />
        </Close>
      </CloseWrap>
      <Box>
        <ReviewList />
      </Box>
    </RestaurantReviewModalWrap>
  )
}

const RestaurantReviewModalWrap = styled.div`
    height: 80%;
    /* position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20; */
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #C09567;
    border-radius: 10px;
    padding: 40px 22px;
    box-sizing: border-box;
    background-color: #fff;
`
const Box = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;
  padding-bottom: 120px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`
const CloseWrap = styled.div`
    &::after{
      display: block;
      content: '';
      line-height: 0;
      clear: both;
    }
    &::before{
      display: block;
      content: '';
      line-height: 0;
      clear: both;
    }
`
const Close = styled.div`
    width: 17px;
    height: 17px;
    margin-bottom: 100px;
    float: right;
    margin-right: 1%;
    margin-top: 40px;
`

// 모달창 밖을 눌렀을 때 모달창 지우기 위한 컴포넌트
const Back = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0, .2);
    overflow: hidden;
`
export default RestaurantReviewModal


// 매장 상세 리뷰 
const ReviewList = () => {
  return (
    <ReviewListWrap>
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
        <ReviewComponent reviewTxt={'처음 가본 곳이었는데, 정말 맛있고 친절했습니다. 다음에 기회가 되면 가족들이랑 꼭 다시 가려구요!'} />
    </ReviewListWrap>
  )
}

const ReviewListWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
`

// 매장 상세 리뷰 한 개 컴포넌트
const ReviewComponent = (props) => {
  return (
    <ReviewBox>
      <Top>
        <Feeling>정말 맛있어요!</Feeling>
        <Date>22.10.11(수)</Date>
      </Top>
      <Middle>
          <ReviewScope>2.8</ReviewScope>
          <ReviewScopeIConWrap></ReviewScopeIConWrap>
      </Middle>
      <Bottom>{props.reviewTxt}</Bottom>
    </ReviewBox>
  )
}

const ReviewBox = styled.div`
    border: 1px solid #C09567;
    border-radius: 10px;
    width: 49.3%;
    margin-bottom: 2%;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`
// 매장명 & 주소
const Top = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: baseline;
`
const Feeling = styled.span`
    font-weight: 700;
    font-size: 30px;
    color: #000000;
    margin-right: 10px;
`
const Date = styled.span`
    font-weight: 400;
    font-size: 15px;
    color: #999999;
`
// 별점 & 아이콘
const Middle = styled.div`
    margin-bottom: 20px;
`
const ReviewScope = styled.span`
    font-weight: 700;
    font-size: 30px;
    color: #000000;
`
const ReviewScopeIConWrap = styled.div`
    
`
// 리뷰
const Bottom = styled.p`
    font-weight: 400;
    font-size: 20px;
    color: #999999;
    margin: 0;
`