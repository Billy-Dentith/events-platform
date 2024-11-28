import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./ShowHidePassword.css";

const ShowHidePassword = ({ name, inputs, signInDetails, handleChange, isLogin }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="input-container">
      <input
        className="input"
        id={name}
        type={!isVisible ? "password" : "text"}
        minLength={8}
        name={name}
        value={isLogin ? signInDetails[name] : inputs[name]}
        autoComplete="current-password"
        required
        onChange={handleChange}
      />
      <span className="password-toggle" onClick={toggle}>
        {isVisible ? <FaEye /> : <FaEyeSlash />}
      </span>    
    </div>
  );
};

export default ShowHidePassword;