import React from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

// Body 컴포넌트 안에 있는 RegionListModal 컴포넌트 css 참고하기

const RestaurantModal = ({detailModalClose}) => {
  return (
    <RestaurantModalWrap>
      <CloseWrap>
        <Close onClick={detailModalClose}>
          <ImgComponent src={'close.png'} width={'100%'} />
        </Close>
      </CloseWrap>
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
          <InfoComponent />
          <InfoComponent />
          <InfoComponent />
        </Info>
        <Divider></Divider>
        <ReviewPage/>
    </RestaurantModalWrap>
  )
}

const RestaurantModalWrap = styled.div`
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    border-top: 1px solid #C09567;
    border-radius: 10px;
    padding: 40px 22px;
    box-sizing: border-box;
    background-color: #fff;
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

const ReviewPage = () => {
  return(
    <ReviewWrap>
      <ReviewTxtWrap>
          <ReviewNum>리뷰 20개</ReviewNum>
          <ReviewMore>더보기</ReviewMore>
      </ReviewTxtWrap>
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

// =================

const InfoComponent = () => {
  return(
    <InfoWrap>
      <InfoIcon>
        <ImgComponent />
      </InfoIcon>
      <InfoTxt></InfoTxt>
    </InfoWrap>
  )
}

const InfoWrap = styled.div``
const InfoIcon = styled.div``
const InfoTxt = styled.div``