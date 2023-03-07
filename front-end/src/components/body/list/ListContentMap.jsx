import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ReviewScope from "./ReviewScope";
import BookmarkImgOFF from "../../../assets/heartOffFill.png";
import BookmarkImgON from "../../../assets/heartOn.png";
import NoImg from "../../../img/noImage.jpg";
import OnClickBookmark from "../../header/OnClickBookmark";

import BookmarkIDAPI from "../../../api/BookmarkIDAPI";
import { setDetailID, setBookmarkData } from "../../../modules/saveData";
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
  const SetBookmarkData = useCallback(
    (data) => {
      dispatch(setBookmarkData(data));
    },
    [dispatch]
  );

  //북마크
  const bookmarkID = useSelector((state) => state.bookmarkID);
  const showURL = useSelector((state) => state.urlChange.name);
  const openLogin = useSelector((state) => state.openBool.login);
  const userJWT = useSelector((state) => state.userData.jwt);
  const [bookmarkAPI, setBookmarkAPI] = useState(false);

  var bookmarkList = bookmarkID[0];
  if (bookmarkID[0] == null) bookmarkList = [0];

  // 이미지 불러오지 못했을 때
  const handleImgError = (e) => {
    e.target.src = NoImg;
  };

  return (
    <ListContentWrap
      onClick={() => {
        SetDetailID(props.data.id);
        SetOpenDetailModal();
      }}
    >
      {/*
        * FIXME - bookmarkAPI는 상태가 변경되지 않는 것처럼 보이는데 어떤 용도일까요?
        */}
      {bookmarkAPI && <OnClickBookmark />}
      <ImgBox>
        <ImgWrap src={props.data.thumbnail} onError={handleImgError} />
      </ImgBox>
      <AboutWrap>
        <Top>
          <TopTitle>
            <Title>{props.data.name}</Title>
            <BookMark
              starcolor={
                bookmarkList.includes(props.data.id)
                  ? BookmarkImgON
                  : BookmarkImgOFF
              }
              onClick={(e) => {
                /*
                 * FIXME - 별도의 함수로 빼서 관리하면 좋을 것 같아요.
                 */
                openLogin
                  ? BookmarkIDAPI(
                      showURL,
                      userJWT,
                      props.data.id,
                      (data) => ResetBookmarkID(data),
                      (data) => SetBookmarkData(data)
                    )
                  : alert("로그인을 해주세요.");
                e.stopPropagation();
              }}
            />
          </TopTitle>
          {/*
            * FIXME - 이렇게하면 어떨까요??
            *   {props.data.numberAddress
                ? <Address>{props.data.roadAddress}</Address>
                : <Address>{props.data.numberAddress}</Address>}
            */}
          {props.data.numberAddress == undefined ? (
            <Address>{props.data.numberAddress}</Address>
          ) : (
            <Address>{props.data.roadAddress}</Address>
          )}
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
  background: #fafafa;
  border: 1px solid #00b295;
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
  transition: 0.2s ease-in;
  &:hover {
    box-shadow: inset 3px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
// 왼쪽 이미지
const ImgBox = styled.div`
  width: 40%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin-right: 25px;
  overflow: hidden;
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin: 0;
  }
`;
const ImgWrap = styled.img`
  width: 100%;
  @media screen and (max-width: 430px) {
    height: 100%;
    width: auto;
  }
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
  @media screen and (min-width: 1900px) {
    width: 70%;
  }
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
