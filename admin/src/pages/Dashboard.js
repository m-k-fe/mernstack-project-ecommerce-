import React from "react";
import Cards from "../components/Cards";
import Navigation from "../components/Navigation";
import NewCustomers from "../components/NewCustomers";
import RecentOrders from "../components/RecentOrders";
import TopBar from "../components/TopBar";

function Dashboard() {
  return (
    <>
      <div className="container">
        <Navigation />
        <div className="main">
          <TopBar />
          <Cards />
          <div className="details">
            <RecentOrders />
            <NewCustomers />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
