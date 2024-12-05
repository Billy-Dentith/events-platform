import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getIdToken } from "../../firebase/AuthService";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

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
      if (user && role === null) {
        try {
          const idToken = await getIdToken();

          if (!idToken) {
            throw new Error("ID Token is null or undefined");
          }

          const response = await axios.get(
            "http://localhost:5500/api/users/get-role",
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          const fetchedRole = response.data.role;

          setRole(fetchedRole);
          localStorage.setItem("role", fetchedRole);
        } catch (error) {
          console.error("Error fetching role: ", error);
        }
      }
    };

    fetchRole();
  }, [user, role]);

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
