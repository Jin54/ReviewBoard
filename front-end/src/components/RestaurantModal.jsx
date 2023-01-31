import React from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

// Body 컴포넌트 안에 있는 RegionListModal 컴포넌트 css 참고하기

const RestaurantModal = () => {
  return (
    <RestaurantModalWrap>
        <Close>
          <ImgComponent src={'close.png'} width={'100%'} />
        </Close>
        {/* <Back></Back>  */}
    </RestaurantModalWrap>
  )
}

const RestaurantModalWrap = styled.div`
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    z-index: 20;
    border-top: 1px solid #C09567;
    border-radius: 10px;
    padding: 40px 22px;
    box-sizing: border-box;
    background-color: #fff;
`
const Close = styled.div`
    width: 17px;
    height: 17px;
    margin-bottom: 100px;
    float: right;
    padding-right: 10px;
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
export default RestaurantModal

const reviewPage = () => {
  return(
    <ReviewWrap>

    </ReviewWrap>
  )
}

const ReviewWrap = styled.div``