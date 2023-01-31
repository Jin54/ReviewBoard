import React from 'react'
import styled from 'styled-components'

// Body 컴포넌트 안에 있는 RegionListModal 컴포넌트 css 참고하기

const RestaurantModal = () => {
  return (
    <RestaurantModalWrap>
        <ModalBox></ModalBox>
        {/* <Back></Back>  */}
    </RestaurantModalWrap>
  )
}

const RestaurantModalWrap = styled.div`
    width: 100%;
    background-color: #f384847f;
    height: 80%;
    position: absolute;
    bottom: 0;
    z-index: 20;
`
const ModalBox = styled.div`

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