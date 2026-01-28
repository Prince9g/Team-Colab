import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Check login status on app load
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data); // backend sends user directly
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // 🔐 Login
  const login = async (email, password) => {
    try {
      // 1️⃣ Login (sets cookie)
      await api.post("/user/login", { email, password });

      // 2️⃣ Fetch user profile using cookie
      const res = await api.get("/user/profile");
      setUser(res.data);

      return { success: true };
    } catch (error) {
      setUser(null);
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    }
  };

  // 🚪 Logout 
  const logout = async () => {
  try {
    await api.post("/user/logout"); // clears cookie on server
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    setUser(null); // always clear client state
  }
};


  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
