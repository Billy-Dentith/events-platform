import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Profile from "../pages/Profile";
import SignIn from '../pages/SignIn';

const AuthRoute = () => {
  const { user } = useContext(AuthContext);   

  if (user) {
    return (
      <Profile />
    )  
  } else {
    return (
      <SignIn />
    )
  }

}

export default AuthRoute;