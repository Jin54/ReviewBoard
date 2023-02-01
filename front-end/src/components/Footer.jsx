import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrap>
        <FooterLeft>
            <Privacy>개인정보처리방침</Privacy>
            <TOS>이용약관</TOS>
        </FooterLeft>
        <FooterRight>
            대표이사 : 박영경 <br />
            사업자 등록번호 : 317-81-47616 | 통신판매신고 제2021-서울영등포-1812호<br />
            제휴/문의 메일 : sales@lfin.kr | 대표번호 02-6959-7414<br />
            본사 : 서울시 강서구 마곡중앙8로 14, M+센터<br />
            기업부설 연구소 : 서울시 관악구 신림로 177 창업 HERE-RO3
        </FooterRight>
    </FooterWrap>
  )
}

const FooterWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 20px;
    @media screen and (max-width: 1000px) {
        flex-direction: column-reverse;
    }
`
// =========
const FooterLeft = styled.div`

`
const Privacy = styled.div`
    margin-bottom: 40px; 
    font-weight: 700;
    font-size: 14px;
    color: #000000;
    @media screen and (max-width: 1000px) {
        font-size: 12px;
        margin-bottom: 10px; 
    }
`
const TOS = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: #000000;
    @media screen and (max-width: 1000px) {
        font-size: 12px;
    }
`

// ========
const FooterRight = styled.p`
    margin: 0;
    font-weight: 100;
    font-size: 12px;
    line-height: 24px;
    color: #000000;
    @media screen and (max-width: 1000px) {
        font-size: 11px;
        line-height: 16px;
        margin-bottom: 15px;
    }
`

export default Footer