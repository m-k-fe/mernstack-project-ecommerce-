import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function MainLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default MainLayout;
