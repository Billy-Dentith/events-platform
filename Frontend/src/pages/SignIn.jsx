import React, { useContext, useState } from "react";
import ShowHidePassword from "../components/ShowHidePassword";
import { FaCheck } from "react-icons/fa6";
import "./SignIn.css";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    currentPassword: "",
  });
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    specialChar: false,
  });
  const [passwordMatches, setPasswordMatches] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const { handleSignUp, handleSignIn } = useContext(AuthContext); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isLogin) {
      setSignInDetails((signInDetails) => ({
        ...signInDetails,
        [name]: value,
      }));
    } else {
      setInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs, [name]: value };

        if (name === "password") {
          setRequirements({
            length: updatedInputs.password.length >= 8,
            number: /[0-9]/.test(updatedInputs.password),
            uppercase: /[A-Z]/.test(updatedInputs.password),
            specialChar: /[!@#£$%^&*()_\-+=[\]{};:'",.<>?\/\\|~`]/.test(
              updatedInputs.password
            ),
          });
        }
        if (name === "confirmPassword" || name === "password") {
          if (updatedInputs.password !== updatedInputs.confirmPassword) {
            setPasswordMatches(false);
          } else if (updatedInputs.password === updatedInputs.confirmPassword) {
            setPasswordMatches(true);
          }
        }

        return updatedInputs;
      });
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false); 
      return;
    }

    try {
      await handleSignUp(inputs);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const signIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await handleSignIn(signInDetails);

      if (response === "auth/invalid-credential") {
        setErrorMessage("Incorrect email or password!");
      } else {
        setErrorMessage("Server error. Please try again later.")
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className="sign-in-page">
      <ul className="sign-in-tabs">
        <li
          className={`toggle ${isLogin ? "selected" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </li>
        <li
          className={`toggle ${isLogin ? "" : "selected"}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </li>
      </ul>
      {isLogin ? (
        <form className="account-form" onSubmit={signIn}>
          <label htmlFor="email">Email</label>
          <input
            className="input"
            id="email"
            type="email"
            name="email"
            value={signInDetails.email}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <ShowHidePassword
            name="currentPassword"
            signInDetails={signInDetails}
            handleChange={handleChange}
            isLogin={isLogin}
          />
          <button className="button">Sign In</button>
          {isLoading && (
            <Loading loadingType="spinner" />
          )}
          {errorMessage && (
            <h2>{errorMessage}</h2>
          )}
        </form>
      ) : (
        <form className="account-form" onSubmit={signUp}>
          <label htmlFor="name">Full Name</label>
          <input
            className="input"
            id="name"
            type="text"
            name="name"
            value={inputs.name}
            required
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="input"
            id="email"
            type="text"
            name="email"
            value={inputs.email}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <ShowHidePassword
            name="password"
            inputs={inputs}
            handleChange={handleChange}
            isLogin={isLogin}
          />
          <div className="password-checks">
            <ul className="requirements">
              <li
                className={`requirement ${
                  requirements.length ? "black" : "grey"
                }`}
              >
                <span className="check-icon green">
                  {requirements.length ? <FaCheck /> : ""}
                </span>
                8 characters minimum
              </li>
              <li
                className={`requirement ${
                  requirements.number ? "black" : "grey"
                }`}
              >
                <span className="check-icon green">
                  {requirements.number ? <FaCheck /> : ""}
                </span>
                One number
              </li>
              <li
                className={`requirement ${
                  requirements.uppercase ? "black" : "grey"
                }`}
              >
                <span className="check-icon green">
                  {requirements.uppercase ? <FaCheck /> : ""}
                </span>
                One uppercase letter
              </li>
              <li
                className={`requirement ${
                  requirements.specialChar ? "black" : "grey"
                }`}
              >
                <span className="check-icon green">
                  {requirements.specialChar ? <FaCheck /> : ""}
                </span>
                One special character
              </li>
            </ul>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <ShowHidePassword
            name="confirmPassword"
            inputs={inputs}
            handleChange={handleChange}
            isLogin={isLogin}
          />
          <p>{passwordMatches ? "" : "Passwords do not match!"}</p>
          <button
            className="button"
            disabled={
              !Object.values(requirements).every(Boolean) ||
              Object.values(inputs).includes("") ||
              Object.values(inputs).includes(undefined)
            }
          >
            Sign Up
          </button>
          {isLoading && (
            <Loading loadingType="spinner" />
          )}
        </form>
      )}
    </div>
  );
};

export default SignIn;