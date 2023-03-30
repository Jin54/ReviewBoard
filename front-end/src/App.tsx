import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";

function App() {
  return (
    <AppWrap>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/"} element={<Index />} />
        </Routes>
      </BrowserRouter>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
  overflow: hidden;
  @media screen and (max-width: 350px) {
    display: none;
  }
`;

export default App;
