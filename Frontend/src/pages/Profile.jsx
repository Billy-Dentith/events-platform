import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import "./Profile.css";

const Profile = () => {
  const { handleSignOut } = useContext(AuthContext)
  
  return (
    <div className='profile-page'>
      <h1>Profile</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Profile;