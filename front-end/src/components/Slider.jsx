import React from "react";
import styled from "styled-components";

// ========== Body Slider Wrap 지도 위 슬라이드

const Slider = () => {
  // const settings = {
  //     pauseOnHover: true,
  //     dots: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };

  return (
    <SliderWrap>
      {/* <Slider {...settings}> */}
      <SlideContent />
      {/* </Slider> */}
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 10;
  background-color: #8f8fec;
`;

// =========== Body Slider Content

const SlideContent = (props) => {
  return <SliderContentWrap></SliderContentWrap>;
};

const SliderContentWrap = styled.div`
  width: 70%;
  height: 100%;
  background: #68b968;
  border: 1px solid #c09567;
  border-radius: 10px;
  margin: auto; // 나중에 지워도 됨
`;

export default Slider;
