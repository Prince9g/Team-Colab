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
        console.log("Fetched user profile:", res.data);
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
      await api.post("/user/login", { email, password });

      // after login, fetch profile
      const res = await api.get("/user/profile");
      setUser(res.data);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    }
  };

  // 🚪 Logout (client-side only)
  const logout = async () => {
    // no backend logout route exists
    setUser(null);

    // optional: hard refresh to clear state
    // window.location.reload();
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
