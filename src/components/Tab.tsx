import React from "react";
import styled from "styled-components";
import { useTabContext } from "../context/TabContext"; // Import Tab Context

const TabComponent: React.FC = () => {
  const { activeTab, setActiveTab } = useTabContext(); // Access context values

  const tabs = [{ name: "Raid" }, { name: "Summary" }, { name: "Leaderboard" }];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab.name}
          active={activeTab === tab.name}
          onClick={() => setActiveTab(tab.name)} // Update active tab via context
        >
          <TabName>{tab.name}</TabName>
        </Tab>
      ))}
    </TabContainer>
  );
};

// Styled components for the tabs
const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border-radius: 8px;
  gap: 0.2rem;
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.div<TabProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active ? "var(--active-color)" : "transparent"};
  color: ${(props) => (props.active ? "#fff" : "#d0d2d5db")};
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.09rem;

  &:hover {
    background-color: var(--background-color);
    font-weight: 500;
  }
`;

const TabName = styled.span``;

export default TabComponent;
