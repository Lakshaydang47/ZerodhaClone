import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => {
  return (
    <ProtectedRoute>
      <TopBar />
      <Dashboard />
    </ProtectedRoute>
  );
};

export default Home;
