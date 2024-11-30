import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SettingSection from "../components/settings/settingSection";
import { useTabContext } from "../context/TabContext";
import LeaderboardSection from "../components/leaderboard/leaderboardSection";
import RaidSectionComponent from "../components/raid/raidSection";


const Home: React.FC = () => {
    const { activeTab, setActiveTab } = useTabContext(); // Access context values

  return (
    <>
      <Container>
         {activeTab === "Settings" && ( <SettingSection/>)}
         {activeTab === "Leaderboard" && ( <LeaderboardSection/>)}
         {activeTab === "Raid" && ( <RaidSectionComponent/>)}
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  padding: 10px;
`;

export default Home;
