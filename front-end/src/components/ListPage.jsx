import React from 'react'
import styled from 'styled-components'
import ImgComponent from './ImageComponent'

const ListPage = ({detailModalOpen}) => {
  return (
    <ListPageWrap>
        <FlexWrap>
            <ListContent onClick={detailModalOpen} />
            <ListContent />
            <ListContent />
            <ListContent />
            <ListContent />
            <ListContent />
        </FlexWrap>
    </ListPageWrap>
  )
}

const ListPageWrap = styled.div`
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px; 
    margin-top: 100px;
    flex: 1;
`

const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
`

export default ListPage

const ListContent = (props) => {
    return (
        <ListContentWrap onClick={props.onClick}>
            <ImgWrap>
                <ImgComponent src={'ex01.png'} width={'100%'} />
            </ImgWrap>
            <AboutWrap>
                <Top>
                    <Title>명동교자</Title>
                    <Address>서울 종로구 종로4길 33 (청진동)</Address>
                </Top>
                <Middle>
                    <Scope>2.8</Scope>
                    <ScopeIConWrap></ScopeIConWrap>
                </Middle>
                <Bottom>리뷰 {props.reviewNum}</Bottom>
            </AboutWrap>
        </ListContentWrap>
    )
}

const ListContentWrap = styled.div`
    background: #FFFFFF;
    border: 1px solid rgba(255, 5, 95, 0.2);
    border-radius: 10px;
    width: 49%;
    margin-bottom: 2.5%;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`
// ====== 왼쪽 이미지
const ImgWrap = styled.div`
    height: 150px;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 25px;
`
// ====== 오른쪽 설명
const AboutWrap = styled.div`
    
`
// 매장명 & 주소
const Top = styled.div`
    margin-bottom: 20px;
`
const Title = styled.span`
    font-weight: 700;
    font-size: 30px;
    color: #000000;
    margin-right: 10px;
`
const Address = styled.span`
    font-weight: 400;
    font-size: 15px;
    color: #999999;
`
// 별점 & 아이콘
const Middle = styled.div`
    margin-bottom: 20px;
`
const Scope = styled.span`
    font-weight: 700;
    font-size: 30px;
    color: #000000;
`
const ScopeIConWrap = styled.div`
    
`
// 리뷰 개수
const Bottom = styled.p`
    font-weight: 400;
    font-size: 20px;
    color: #999999;

`