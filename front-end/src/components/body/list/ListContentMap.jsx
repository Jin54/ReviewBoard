import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ReviewScope from "./ReviewScope";
import BookmarkImgOFF from "../../../assets/heartOffFill.png";
import BookmarkImgON from "../../../assets/heartOn.png";
import ImgComponent from "../../ImageComponent";

import BookmarkIDAPI from "../../../api/BookmarkIDAPI";
import { setDetailID } from "../../../modules/saveData";
import { setOpenDetailModal } from "../../../modules/openBool";
import { resetBookmarkID } from "../../../modules/bookmarkID";

const ListContentMap = (props) => {
  const dispatch = useDispatch();
  const SetOpenDetailModal = useCallback(() => {
    dispatch(setOpenDetailModal());
  }, [dispatch]);
  const SetDetailID = useCallback(
    (id) => dispatch(setDetailID(id)),
    [dispatch]
  );
  const ResetBookmarkID = useCallback(
    (idList) => dispatch(resetBookmarkID(idList)),
    [dispatch]
  );

  //북마크
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const showURL = useSelector((state) => state.urlChange.name);
  const kakaoToken = useSelector((state) => state.token.kakao);
  const openLogin = useSelector((state) => state.openBool.login);

  if (bookmarkID[0] == null) {
    ResetBookmarkID([0]);
  }

  return (
    <ListContentWrap
      onClick={() => {
        SetDetailID(props.data.id);
        SetOpenDetailModal();
      }}
    >
      <ImgBox>
        {props.data.thumbnail ? (
          <ImgWrap imgUrl={props.data.thumbnail}></ImgWrap>
        ) : (
          <ImgComponent src={"noImage.jpg"} width={"90%"} />
        )}
      </ImgBox>
      <AboutWrap>
        <Top>
          <TopTitle>
            <Title>{props.data.name}</Title>
            <BookMark
              starcolor={
                bookmarkID[0].includes(props.data.id)
                  ? BookmarkImgON
                  : BookmarkImgOFF
              }
              onClick={(e) => {
                openLogin
                  ? BookmarkIDAPI(showURL, kakaoToken, props.data.id, (data) =>
                      ResetBookmarkID(data)
                    )
                  : alert("로그인을 해주세요.");
                e.stopPropagation();
              }}
            />
          </TopTitle>
          <Address>{props.data.numberAddress}</Address>
        </Top>
        <Middle>
          <Scope>{props.data.review_rating}</Scope>
          <ReviewScope scope={props.data.review_rating} />
        </Middle>
        <Bottom>리뷰 {props.data.review_number}</Bottom>
      </AboutWrap>
    </ListContentWrap>
  );
};

export default ListContentMap;

const ListContentWrap = styled.div`
  background: #ffffff;
  border: 1px solid #c09567;
  border-radius: 10px;
  width: 49%;
  margin-bottom: 2%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
// 왼쪽 이미지
const ImgBox = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 10px;
  margin-right: 25px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`;
const ImgWrap = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${(props) => props.imgUrl}) no-repeat center;
  background-size: cover;
`;
// 오른쪽 설명
const AboutWrap = styled.div`
  width: 50%;
  @media screen and (max-width: 1000px) {
    flex: 0;
    width: 100%;
    margin-top: 10px;
  }
`;
// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
  }
`;
const TopTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 4px;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;
const BookMark = styled.div`
  width: 24px;
  background-image: url(${(props) => props.starcolor});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
`;
const Address = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 1000px) {
    font-size: 11px;
    width: 100%;
  }
`;
// 별점 & 아이콘
const Middle = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1500px) and (min-width: 1000px) {
    width: 110%;
  }
  @media screen and (max-width: 999px) and (min-width: 600px) {
    width: 70%;
  }
  @media screen and (max-width: 599px) and (min-width: 470px) {
    width: 90%;
  }
  @media screen and (max-width: 469px) {
    width: 100%;
  }
`;
const Scope = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 16px;
  @media screen and (max-width: 1500px) and (min-width: 1000px) {
    font-size: 16px;
    margin-right: 8px;
  }
  @media screen and (max-width: 999px) {
    margin-right: 5px;
  }
`;

// 리뷰 개수
const Bottom = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  @media screen and (max-width: 1000px) {
    margin: 0;
    font-size: 11px;
  }
`;
