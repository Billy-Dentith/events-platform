import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getIdToken } from "../../firebase/AuthService";
import { getRole, addUser } from "../api";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        console.log("User signed in: ", user);
      } else {
        setRole(null); 
        localStorage.removeItem("role");
      }
    });

    return () => unsubscribe();
  }, []);
  
  const fetchRole = async () => {
    try {
      const idToken = await getIdToken();

      if (!idToken) {
        throw new Error("ID Token is null or undefined");
      }

      const response = await getRole(idToken); 
      console.log("Role fetched from API: ", response.role);

      return response.role; 
    } catch (error) {
      console.error("Error fetching role: ", error);

      return null; 
    }
  };

  const handleSignUp = async (inputs) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      await updateProfile(userCredential.user, { displayName: inputs.name });

      const { uid, displayName, email } = userCredential.user;

      const body = {
        uid,
        name: displayName,
        email,
        role: "attendee",
      };

      const data = await addUser(body);

      const fetchedRole = await fetchRole();

      setRole(fetchedRole);
      localStorage.setItem("role", fetchedRole);

      console.log("User created: ", data);
    } catch (error) {
      console.error("Sign-up error: ", error.message);
    }
  };

  const handleSignIn = async (signInDetails) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        signInDetails.email,
        signInDetails.currentPassword
      );

      const fetchedRole = await fetchRole();
      
      setRole(fetchedRole);
      localStorage.setItem("role", fetchedRole);
      
      console.log("Success: ", auth.currentUser.email);
    } catch (error) {
      console.log(error);
      return error.code;
    } 
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setRole(null);
      localStorage.removeItem("role");
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Sign out error: ", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, setRole, handleSignUp, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
