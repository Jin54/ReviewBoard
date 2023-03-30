import { useState, useMemo, useRef } from "react";
import styled from "styled-components";

const ReviewMoreBtn = (text: string, id: number) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const textLimit = useRef(Number(10));

  const commenter = useMemo(() => {
    const shortReview = text.slice(0, textLimit.current);

    if (text.length > textLimit.current) {
      if (isShowMore) {
        return text;
      }
      return shortReview;
    }
    return text;
  }, [isShowMore]);

  if (text == null) return text;
  <BottomWrap>
    <Bottom>{commenter}</Bottom>
    <More onClick={() => setIsShowMore(!isShowMore)}>
      {text != null &&
        text.length > textLimit.current &&
        (isShowMore ? " 닫기" : "...더보기")}
    </More>
  </BottomWrap>;
  return text;
};

export default ReviewMoreBtn;

const BottomWrap = styled.div`
  width: 100%;
`;
const Bottom = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  margin: 0;
  width: 100%;
  text-overflow: ellipsis;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    margin: 0;
    font-size: 11px;
  }
`;

const More = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  @media screen and (max-width: 1000px) {
    font-size: 11px;
  }
`;
