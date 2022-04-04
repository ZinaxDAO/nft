import React from "react";
import "./Dashboard.css";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/Footer/Footer";
import DashboardMenu from "./DashboardMenus/DashboardMenu";
import DashboardIntro from "./DashboardIntro/DashboardIntro";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard">
        <Navbar />

        <DashboardIntro />
      </div>
      <DashboardMenu />

      <Footer />
    </div>
  );
};

export default Dashboard;
