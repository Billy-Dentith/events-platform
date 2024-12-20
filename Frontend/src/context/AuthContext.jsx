import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getIdToken } from "../../firebase/AuthService";
import { getRole } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  const [isUserAdded, setIsUserAdded] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (!user) {
        setRole(null);
        localStorage.removeItem("role");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      if (user && role === null && isUserAdded) {
        try {
          const idToken = await getIdToken();

          if (!idToken) {
            throw new Error("ID Token is null or undefined");
          }

          const response = await getRole(idToken); 

          const fetchedRole = response.role;

          setRole(fetchedRole);
          localStorage.setItem("role", fetchedRole);
        } catch (error) {
          console.error("Error fetching role: ", error);

          const fallbackRole = "user"
          setRole(fallbackRole);
          localStorage.setItem("role", fallbackRole);

          console.log("Assigned default role of 'user'");
        }
      }
    };

    fetchRole();
  }, [user, role, isUserAdded]);

  const markUserAsAdded = () => setIsUserAdded(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Sign out error: ", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, setUser, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
