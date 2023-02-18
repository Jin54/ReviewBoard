import React from "react";
import styled from "styled-components";

// components import
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

//redux

const Index = () => {
  return (
    <IndexWrap>
      <Header />
      <Body />
      {/* <RestaurantModal />
      <RestaurantReviewModal /> */}
      <Footer />
    </IndexWrap>
  );
};

const IndexWrap = styled.div`
  padding-right: 5%;
  position: relative;
  padding-left: 5%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    padding-left: 8%;
    padding-right: 8%;
  }
`;
export default Index;
