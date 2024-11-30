import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import NavbarComponent from "./components/Navbar";
import TabComponent from "./components/Tab";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Container>
        <NavbarComponent /> {/* navbar */}
        <TabComponent /> {/* tabs */}
        <Home />          {/* home */}

      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 2rem;
  width: 100vw;
  height: 100vh; // Full viewport height
  background: linear-gradient(356deg, #252728, #1d1d1f);
  color: var(--text-color);
  &::-webkit-scrollbar{
    width: 5px;
  }
`;

export default App;
