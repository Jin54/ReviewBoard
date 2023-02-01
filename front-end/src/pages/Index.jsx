import React, {useState} from 'react'
import styled from 'styled-components'
// components import
import Header from '../components/Header'
import Body from '../components/Body'
import ListPage from '../components/ListPage'
import Footer from '../components/Footer'
import RestaurantModal from "../components/RestaurantModal";
import RestaurantReviewModal from '../components/RestaurantReviewModal'

const Index = () => {
  // 지도보기 & 리스트 버튼 클릭시 해당 페이지 보이기
  const [showPage, setShowPage] = useState("지도보기");

  const showMap = () => {
    setShowPage('지도보기')
  }
  const showList = () => {
    setShowPage('리스트보기')
  }

  // 매장 상세 보기
  const [restauratModal, setRestaurantModal] = useState(false)
 
  const detailModalOpen = () => {
    setRestaurantModal(true)
  }
  const detailModalClose = () => {
    setRestaurantModal(false)
  }

  // 더보기 클릭 시 전체 리뷰 모달
  const [allReview, setAllReview] = useState(false)
  const openAllReivew = () => {
    setAllReview(true)
  }
  const closeAllReview = () => {
    setAllReview(false)
  }

  return (
    <IndexWrap>
        <Header />
        <MapOrList showMap={showMap} showList={showList} showPage={showPage} />
        {showPage === '지도보기' && 
          <Body/>
        }
        {showPage === '리스트보기' && 
          <ListPage
          detailModalOpen={detailModalOpen}
          />
        }
        {restauratModal && 
          <RestaurantModal
            detailModalClose={detailModalClose} 
            openAllReivew={openAllReivew} 
        />
        }
        {allReview && 
          <RestaurantReviewModal 
          closeAllReview={closeAllReview}
          />
        }
        <Footer />
    </IndexWrap>
  )
}

const IndexWrap = styled.div`
    /* padding-right: 100px;
    padding-left: 100px; */
    padding-right: 5%;
    padding-left: 5%;
    box-sizing: border-box;
    /* width: 100%; */
    height: 100%;
    display: flex;
    flex-direction: column;
`

export default Index

// ========= 지도보기 & 리스트보기 버튼

const MapOrList = ({showMap, showList, showPage}) => {
  return (
    <MapOrListWrap>
      <MapBtn onClick={showMap} selected={showPage ==='지도보기'}>지도보기</MapBtn>
      <ListBtn onClick={showList} selected={showPage ==='리스트보기'}>리스트보기</ListBtn>
    </MapOrListWrap>
  )
}

const MapOrListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  margin: auto;
  margin-top: 40px;
  flex: 0;
`
const MapBtn = styled.p`
  margin: 0;
  margin-right: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${props=>props.selected ? '#000' : '#999'};
`
const ListBtn = styled.p`
  margin: 0;
  margin-left: 40px;
  font-weight: 400;
  font-size: 20px;
  color: ${props=>props.selected ? '#000' : '#999'};
`