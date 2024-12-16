import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>Unable to load events. Please try again later. </p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
};

export default Error;
