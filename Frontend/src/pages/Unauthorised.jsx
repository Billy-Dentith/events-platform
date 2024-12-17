import React from "react";
import "./Unauthorised.css";
import { Link, useNavigate } from "react-router-dom";

const Unauthorised = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorised-page">
      <h1>Unauthorised!</h1>
      <p>You are not authorised to enter this page!</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default Unauthorised;
