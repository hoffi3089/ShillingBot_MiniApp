import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TabProvider } from "./context/TabContext.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <TabProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TabProvider>
  );
}
