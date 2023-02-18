import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ModalAPI from "../../../api/ModalAPI";
import { setDetailData } from "../../../modules/saveData";
import { addBookmark, deleteBookmark } from "../../../modules/bookmark";

import ImgComponent from "../../ImageComponent";
import ReviewScope from "../list/ReviewScope";
import DetailInfo from "./detialModal/DetailInfo";
import ReviewList from "./detialModal/ReviewList";

const DetailModal = (props) => {
  const showURL = useSelector((state) => state.urlChange.name);
  const detailID = useSelector((state) => state.saveData.detailID);
  const detailData = useSelector((state) => state.saveData.detailData);
  const bookmark = useSelector((state) => state.bookmark);
  const dispatch = useDispatch();
  const SetDetailData = useCallback(
    (data) => dispatch(setDetailData(data)),
    [dispatch]
  );
  const AddBookmark = useCallback(
    (id) => dispatch(addBookmark(id)),
    [dispatch]
  );
  const DeleteBookmark = useCallback(
    (id) => dispatch(deleteBookmark(id)),
    [dispatch]
  );
  const [bookmarkColor, setBookmarkColor] = useState("red"); //북마크 색상

  //가게 상세 API
  useEffect(() => {
    if (detailID == null) return;

    bookmark.includes(detailID)
      ? setBookmarkColor("blue")
      : setBookmarkColor("red");

    ModalAPI(showURL, detailID, (data) => {
      SetDetailData(data);
    });
  }, []);
  //북마크
  function bookmarkTrue(id) {
    DeleteBookmark(id);
    setBookmarkColor("red");
  }
  function bookmarkFalse(id) {
    AddBookmark(id);
    setBookmarkColor("blue");
  }

  if (detailData == null) return;

  return (
    <RestaurantModalWrap>
      {console.log("디테일")}
      <CloseWrap>
        <Close onClick={() => props.setOpenDetailModal(false)}>
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        <div key={detailData.id}>
          <MainImg>
            <Thumbnail src={detailData.thumbnail} width={"100%"} />
          </MainImg>
          <About>
            <Title>{detailData.name}</Title>
            <Address>{detailData.numberAddress}</Address>
            <ScopeWrap>
              <Scope>{detailData.review_rating}</Scope>
              <ReviewScope scope={detailData.review_rating} />
            </ScopeWrap>
          </About>
          <InfoWrap>
            <Info>
              <DetailInfo img={"time.png"} txt={detailData.time} />
              <DetailInfo img={"sort.png"} txt={detailData.sort} />
              <DetailInfo img={"phone.png"} txt={detailData.number} />
            </Info>
            <Bookmark
              bookmarkColor={bookmarkColor}
              onClick={() => {
                bookmark.includes(detailID)
                  ? bookmarkTrue(detailID)
                  : bookmarkFalse(detailID);
              }}
            />
          </InfoWrap>
        </div>
        <Divider></Divider>
        <ReviewWrap>
          <ReviewTxtWrap>
            <ReviewNum>리뷰 {detailData.review_number}개</ReviewNum>
            {!(detailData.review_number === 0) && (
              <ReviewMore>더보기</ReviewMore>
            )}
          </ReviewTxtWrap>
          {console.log(detailData)}
          <ReviewList />
        </ReviewWrap>
      </Box>
    </RestaurantModalWrap>
  );
};

export default DetailModal;

const RestaurantModalWrap = styled.div`
  height: 100%;
  width: 100%;
  z-index: 20;
  position: absolute;
  left: 0;
  bottom: 0;
  border: 1px solid #c09567;
  border-radius: 10px;
  padding: 40px 22px;
  box-sizing: border-box;
  background-color: #fff;
  @media screen and (max-width: 1000px) {
    padding-top: 20px;
  }
`;

const Thumbnail = styled.img``;

const Box = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CloseWrap = styled.div`
  &::after {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
  &::before {
    display: block;
    content: "";
    line-height: 0;
    clear: both;
  }
`;
const Close = styled.div`
  width: 17px;
  height: 17px;
  margin-bottom: 30px;
  float: right;
  margin-right: 1%;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    width: 12px;
    height: 12px;
    margin-right: 0;
    padding-right: 0;
  }
`;

const MainImg = styled.div`
  background-color: #fff;
  border-radius: 10px;
  width: 80%;
  margin: auto;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    height: 300px;
    width: 90%;
  }
`;
const About = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin: 0;
`;
const Address = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
`;
const ScopeWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 30%;
  @media screen and (max-width: 1300px) and (min-width: 400px) {
    width: 40%;
  }
  @media screen and (max-width: 399px) {
    width: 80%;
  }
`;
const Scope = styled.p`
  margin: 0;
  margin-right: 20px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`;
//=============
const InfoWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Info = styled.div`
  margin-left: 20px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;
const Bookmark = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.bookmarkColor};
  cursor: pointer;
`;
// ============
const Divider = styled.div`
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  height: 0.5px;
  background-color: #c09567;
  @media screen and (max-width: 1000px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;
// =============

const ReviewWrap = styled.div`
  width: 100%;
`;
const ReviewTxtWrap = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;
const ReviewNum = styled.p`
  margin: 0;
  margin-right: 10px;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;
const ReviewMore = styled.p`
  margin: 0;
  background: #c09567;
  border: 1px solid #c09567;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
    padding: 8px;
  }
`;