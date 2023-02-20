//상세 모달창의 리뷰 컴포넌트
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import ReviewAPI from "../../../../api/ReviewAPI";

import ReviewScope from "../../list/ReviewScope";
import ReviewDetailModal from "./ReviewDetailModal";

const ReviewList = () => {
  const [pageNum, setPageNum] = useState(0);
  const [reviewData, setReviewData] = useState(null);
  const showURL = useSelector((state) => state.urlChange.name);
  const detailID = useSelector((state) => state.saveData.detailID);
  const [overflow, setOverflow] = useState('hidden')
  const [whiteSpace, setWhiteSpace] = useState('nowrap')
  const [type, setType] = useState([]);

  //무한 스크롤
  const [bottom, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    setPageNum(pageNum + 10);
  }, [inView]);

  //리뷰 API
  useEffect(() => {
    if (detailID == null) return;
    ReviewAPI(showURL, detailID, pageNum, (data) => {
      setReviewData(data);
    });
  }, [pageNum]);

  console.log(reviewData)
  
  if (reviewData == null) {
    return (
      <>
        <ReviewNone>리뷰 없음</ReviewNone>
        <div ref={bottom} style={{ height: "10px", width: "100px" }}></div>
      </>
    );
  }

  // 리뷰 글 전체 보여주기



  const putType = (text) => {
    const newArray = type.filter(function (txtdata) {
      return txtdata !== text;
    });

    !type.includes(text)
      ? setType([...type, text])
      : setType(type.filter((item) => item !== text));
  };

  return (
    <ReviewFlexWrap>
      {reviewData.map(
        (review, index) =>
          index < pageNum && (
            <ReviewBox key={review.id} onClick={() => putType(review.id)}>
              {/* <ReviewDetailModal rate={review.rating} /> */}
              <Top>
                <Feeling scope={review.rating} />
                <Date>{review.createAT}</Date>
              </Top>
              <Middle>
                <ReviewScopeNum>{review.rating}</ReviewScopeNum>
                {!(review.rating == null || undefined) && (
                  <ReviewScope scope={review.rating} />
                )}
              </Middle>
              <Bottom overflow={!type.includes(review.id) && overflow} whiteSpace={!type.includes(review.id) && whiteSpace}>{review.content}</Bottom>
            </ReviewBox>
          )
      )}
      <div ref={bottom} style={{ height: "10px", width: "100px" }}></div>
    </ReviewFlexWrap>
  );
};

export default ReviewList;

const ReviewFlexWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ReviewNone = styled.p`
  color: #c09567;
  text-align: center;
  font-size: 20px;
  padding-top: 20px;
`;

const ReviewBox = styled.div`
  border: 1px solid #c09567;
  border-radius: 10px;
  width: 49%;
  margin-bottom: 2%;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    padding: 15px;
  }
`;

// 매장명 & 주소
const Top = styled.div`
  margin-bottom: 20px;
  @media screen and (max-width: 1000px) {
    margin-bottom: 6px;
    flex-direction: column;
    display: flex;
  }
`;

const Date = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
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
  width: 45%;
  @media screen and (max-width: 1300px) and (min-width: 400px) {
    width: 80%;
  }
  @media screen and (max-width: 399px) {
    width: 100%;
  }
`;
const ReviewScopeNum = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
`;
// 리뷰
const Bottom = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  margin: 0;
  width: 100%;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  white-space: ${(props) => props.whiteSpace};
  /* overflow: hidden; */
  overflow: ${(props) => props.overflow};
  @media screen and (max-width: 1000px) {
    margin: 0;
    font-size: 11px;
  }
`;

const Feeling = ({ scope }) => {
  function txt(scope) {
    if (scope >= 4.5) {
      return "정말 맛있어요!";
    } else if (scope < 4.5 && scope >= 3.5) {
      return "맛있어요!";
    } else if (scope < 3.5 && scope >= 2.5) {
      return "괜찮아요!";
    } else if (scope < 2.5 && scope >= 1.5) {
      return "그저 그래요";
    } else if (scope == null) {
      return "별점을 주지 않았습니다";
    } else {
      return "별로예요";
    }
  }
  return <FeelingWrap>{txt(scope)}</FeelingWrap>;
};
const FeelingWrap = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 10px;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    margin: 0;
    margin-bottom: 4px;
  }
`;
