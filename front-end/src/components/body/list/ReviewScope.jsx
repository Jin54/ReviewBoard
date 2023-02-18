import React from "react";
import styled from "styled-components";

const ReviewScope = ({ scope }) => {
  const calcStarRates = (scope) => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (scope * 20 * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  const starList = calcStarRates(scope).map((item, idx) => (
    <span className="star_icon" key={idx}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="90%"
        height="50%"
        viewBox="0 0 14 13"
        fill="#cacaca"
      >
        <clipPath id={`${item}StarClip`}>
          <rect width={`${item}`} height="39" />
        </clipPath>
        <path
          id={`${item}Star`}
          d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
          transform="translate(-2 -2)"
        />
        <use
          clipPath={`url(#${item}StarClip)`}
          href={`#${item}Star`}
          fill="#f6ed74"
          key={idx}
        />
      </svg>
    </span>
  ));

  return <StarRateWrap>{starList}</StarRateWrap>;
};

export default ReviewScope;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`;
