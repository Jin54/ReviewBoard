import React from "react";
import styled from "styled-components";

// components import
import Header from "../components/header/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <IndexWrap>
      <Header />
      <Body />
      <FooterLocation>
        <Footer />
      </FooterLocation>
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

const FooterLocation = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
export default Index;
