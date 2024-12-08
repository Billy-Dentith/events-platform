import React from "react";
import "./StaffDashboard.css";
import CreateEvent from "../components/CreateEvent";

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>
      <CreateEvent />
    </div>
  );
};

export default StaffDashboard;
