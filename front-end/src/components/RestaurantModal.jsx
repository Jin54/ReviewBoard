import React, { useState } from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

// Body 컴포넌트 안에 있는 RegionListModal 컴포넌트 css 참고하기

const RestaurantModal = ({detailModalClose, openAllReivew}) => {

  return (
    <RestaurantModalWrap>
      <CloseWrap>
        <Close onClick={detailModalClose}>
          <ImgComponent src={'close.png'} width={'100%'} />
        </Close>
      </CloseWrap>
      <Box>
        {/* <Back></Back>  */}
        <MainImg>
          <ImgComponent src={'ex01.png'} width={'100%'} />
        </MainImg>
        <About>
          <Title>명동교자</Title>
           <Address>서울 종로구 종로4길 33 (청진동)</Address>
           <ScopeWrap>
               <Scope>2.8</Scope>
               <ScopeIConWrap></ScopeIConWrap>
           </ScopeWrap>
        </About>
        <Info>
          <InfoComponent img={'time.png'} txt={'11:00 ~ 22:00'} />
          <InfoComponent img={'link.png'} txt={'www.myoungdong.com'} />
          <InfoComponent img={'phone.png'} txt={'01-1234-1234'} />
        </Info>
        <Divider></Divider>
        <ReviewPage onClick={openAllReivew}/>
      </Box>
    </RestaurantModalWrap>
  )
}

const RestaurantModalWrap = styled.div`
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

const MainImg = styled.div`
  width: 80%;
  margin: auto;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
`
const About = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.p`
  font-weight: 700;
  font-size: 50px;
  color: #000000;
  margin: 0;
`
const Address = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 20px;
  color: #999999;
`
const ScopeWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const Scope = styled.p`
  margin: 0;
  margin-right: 20px;
  font-weight: 700;
  font-size: 50px;
  color: #000000;
`
const ScopeIConWrap = styled.div`
  display: flex;
  align-items: center;
`
//=============
const Info = styled.div`
  margin-left: 40px;
`
// ============
const Divider = styled.div`
  border: 0;
  margin-bottom: 40px;
  margin-top: 50px;
  height: 0.5px;
  background-color: #c09567;
`
// =============

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
export default RestaurantModal

// 매장 상세 하단 리뷰 전체 컴포넌트 ( 리뷰 개수, 더보기 버튼, 리뷰 리스트 )
const ReviewPage = (props) => {
  return(
    <ReviewWrap>
      <ReviewTxtWrap>
          <ReviewNum>리뷰 20개</ReviewNum>
          <ReviewMore onClick={props.onClick}>더보기</ReviewMore>
      </ReviewTxtWrap>
      <ReviewList />
    </ReviewWrap>
  )
}

const ReviewWrap = styled.div``
const ReviewTxtWrap = styled.div`
  margin-left: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ReviewNum = styled.p`
  margin: 0;
  margin-right: 20px;
  font-weight: 400;
  font-size: 20px;
  color: #999999;
`
const ReviewMore = styled.p`
  margin: 0;
  height: 49px;
  background: #C09567;
  border: 1px solid #C09567;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`

// 매장 상세 중간 정보 컴포넌트 ( 영업 시간, 링크, 번호 )

const InfoComponent = (props) => {
  return(
    <InfoWrap>
      <InfoIcon>
        <ImgComponent src={props.img} width={'100%'} />
      </InfoIcon>
      <InfoTxt>{props.txt}</InfoTxt>
    </InfoWrap>
  )
}

const InfoWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`
const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 10px;
`
const InfoTxt = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #999999;
`

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
        <Date>서울 종로구 종로4길 33 (청진동)</Date>
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