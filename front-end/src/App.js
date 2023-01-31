import React from 'react'
import styled from 'styled-components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
// components import
import Index from './pages/Index'

function App () {
  return (
    <AppWrap>
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<Index />} />
        </Routes>
      </BrowserRouter>
    </AppWrap>
  );
}

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export default App;
