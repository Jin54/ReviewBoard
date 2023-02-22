import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ModalAPI from "../../../api/ModalAPI";
import BookmarkIDAPI from "../../../api/BookmarkIDAPI";
import { setDetailData } from "../../../modules/saveData";
import { resetBookmarkID } from "../../../modules/bookmarkID";
import { setOpenDetailModal } from "../../../modules/openBool";
import { setBookmarkData } from "../../../modules/saveData";

import ImgComponent from "../../ImageComponent";
import ReviewScope from "../list/ReviewScope";
import DetailInfo from "./detialModal/DetailInfo";
import ReviewList from "./detialModal/ReviewList";
import BookmarkImgOFF from "../../../assets/heartOffFill.png";
import BookmarkImgON from "../../../assets/heartOn.png";

const DetailModal = () => {
  //모달 api
  const detailID = useSelector((state) => state.saveData.detailID);
  const detailData = useSelector((state) => state.saveData.detailData);
  const dispatch = useDispatch();
  const SetOpenDetailModal = useCallback(() => {
    dispatch(setOpenDetailModal());
  }, [dispatch]);
  const SetDetailData = useCallback(
    (data) => dispatch(setDetailData(data)),
    [dispatch]
  );

  //북마크
  const showURL = useSelector((state) => state.urlChange.name);
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const ResetBookmarkID = useCallback(
    (data) => dispatch(resetBookmarkID(data)),
    [dispatch]
  );
  const SetBookmarkData = useCallback(
    (data) => {
      dispatch(setBookmarkData(data));
    },
    [dispatch]
  );
  const openLogin = useSelector((state) => state.openBool.login);

  //가게 상세 API
  useEffect(() => {
    if (detailID == null) return;

    ModalAPI(showURL, detailID, (data) => {
      SetDetailData(data);
    });
  }, []);

  var bookmarkList = bookmarkID[0];
  if (bookmarkID[0] == null) bookmarkList = [0];

  if (detailData == null || detailID == null) return;

  return (
    <RestaurantModalWrap>
      <CloseWrap>
        <Close
          onClick={() => {
            SetOpenDetailModal();
          }}
        >
          <ImgComponent src={"close.png"} width={"100%"} />
        </Close>
      </CloseWrap>
      <Box>
        <MainImg>
          {detailData.thumbnail ? (
            <Thumbnail src={detailData.thumbnail} width={"100%"} />
          ) : (
            <ImgComponent src={"noImage.jpg"} width={"80%"} />
          )}
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
            <DetailInfo
              img={"time.png"}
              txt={detailData.time}
              arrow={detailData.time}
              time={detailData.time}
            />
            <DetailInfo img={"sort.png"} txt={detailData.sort} />
            <DetailInfo img={"phone.png"} txt={detailData.number} />
          </Info>
          <InfoRight>
            <Copy
              onClick={() => {
                navigator.clipboard.writeText(showURL + ": " + detailData.id);
                alert(
                  "해당 가게 정보가 클립보드에 복사되었습니다.\n문의하기를 클릭하여 변경 정보를 ID 와 함께 보내주세요."
                );
              }}
            >
              정보 변경
            </Copy>
            <Bookmark
              starcolor={
                bookmarkList.includes(detailData.id)
                  ? BookmarkImgON
                  : BookmarkImgOFF
              }
              onClick={() => {
                openLogin
                  ? BookmarkIDAPI(
                      showURL,
                      detailData.id,
                      (data) => ResetBookmarkID(data),
                      (data) => SetBookmarkData(data)
                    )
                  : alert("로그인을 해주세요.");
              }}
            />
          </InfoRight>
        </InfoWrap>
        <Divider></Divider>
        <ReviewWrap>
          <ReviewTxtWrap>
            <ReviewNum>리뷰 {detailData.review_number}개</ReviewNum>
          </ReviewTxtWrap>
          <ReviewList />
        </ReviewWrap>
      </Box>
      <BackBlack
        onClick={() => {
          SetOpenDetailModal();
        }}
      />
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
const InfoRight = styled.div`
  margin-right: 20px;
  display: flex;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
  }
`;
const Copy = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: #999999;
`;
const Bookmark = styled.div`
  cursor: pointer;
  width: 24px;
  background-image: url(${(props) => props.starcolor});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  @media screen and (max-width: 1000px) {
    width: 36px;
  }
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
  margin-left: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

const BackBlack = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -20;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
`;
