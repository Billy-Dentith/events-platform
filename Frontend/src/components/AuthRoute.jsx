import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Profile from "../pages/Profile";
import SignIn from '../pages/SignIn';

const AuthRoute = () => {
  const { currentUser } = useContext(AuthContext);   

  if (currentUser) {
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