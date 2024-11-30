import React, { createContext, useContext, useState, ReactNode } from "react";

// Type for Tab Context
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Create a context with default values
const TabContext = createContext<TabContextType | undefined>(undefined);

// TabProvider component to wrap around components that need tab state
interface TabProviderProps {
  children: ReactNode;
}

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("Raid");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use TabContext easily
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};
