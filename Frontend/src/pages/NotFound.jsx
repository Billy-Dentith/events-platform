import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for...</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default NotFound;
