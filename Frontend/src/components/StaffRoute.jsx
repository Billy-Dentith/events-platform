import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const StaffRoute = ({ children }) => {
  const { role } = useContext(AuthContext);

  return role === "staff" ? children : <Navigate to="/unauthorized" />;
};

export default StaffRoute;
