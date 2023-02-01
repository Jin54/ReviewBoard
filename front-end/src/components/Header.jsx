import React from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

const Header = () => {
  return (
    <HeaderWrap>
        <HedaerLeftWrap>
            <ImgComponent src={'logo.png'} width={'60px'}  />
            <FoodBtn>맛집</FoodBtn>
            <HospitalBtn>병원</HospitalBtn>
        </HedaerLeftWrap>
        <Question>문의하기</Question>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
// ============
const HedaerLeftWrap = styled.div`
    display: flex;
    align-items: center;
`
const FoodBtn = styled.div`
    margin-left: 100px;
    color: #000;
    font-weight: ${props=>props.selected ? '700' : '400'};
    font-size: 16px;
    letter-spacing: 0.01em;
    border-bottom:  0px solid #C09567;
    padding-bottom: ${props=>props.selected && '10px'};
    border-bottom: ${props=>props.selected && '4px'};
  @media screen and (max-width: 1000px) {
   display: none;
  }
`
const HospitalBtn = styled.div`
    margin-left: 70px;
    color: #000;
    font-weight: ${props=>props.selected ? '700' : '400'};
    font-size: 16px;
    letter-spacing: 0.01em;
    border-bottom:  0px solid #C09567;
    padding-bottom: ${props=>props.selected && '10px'};
    border-bottom: ${props=>props.selected && '4px'};
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

// ============
const Question = styled.div`
    border: 1.5px solid #C09567;
    border-radius: 50px;
    padding: 7px;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #C09567;
    width: 100px;
    box-sizing: border-box;
    @media screen and (max-width: 1000px) {
    display: none;
  }
`

export default Header