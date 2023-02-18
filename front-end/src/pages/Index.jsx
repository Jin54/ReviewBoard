import React from "react";
import styled from "styled-components";
import { useState } from "react";

// components import
import Header from "../components/header/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";

//redux

const Index = () => {
  const [openListModal, setOpenListModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <IndexWrap>
      <Header
        setOpenListModal={setOpenListModal}
        setOpenDetailModal={setOpenDetailModal}
      />
      <Body
        openListModal={openListModal}
        openDetailModal={openDetailModal}
        setOpenListModal={setOpenListModal}
        setOpenDetailModal={setOpenDetailModal}
      />
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
