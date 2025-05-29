// AppWithTracking.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import App from "./App";
import { initGA, trackPageView } from "./ga";

const AppWithTracking: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return <App />;
};

export default AppWithTracking;
