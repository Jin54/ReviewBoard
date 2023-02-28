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
    </IndexWrap>
  );
};

const IndexWrap = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default Index;
