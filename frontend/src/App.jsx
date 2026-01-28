import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import LeadDashboard from "./pages/LeadDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./store/AuthContext";

// 🔁 Handles "/" route intelligently
const RootRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Navigate
      to={user.role === "admin" ? "/dashboard" : "/member"}
      replace
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Root */}
          <Route index element={<RootRedirect />} />

          {/* Admin (Lead) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LeadDashboard />
              </ProtectedRoute>
            }
          />

          {/* User (Member) */}
          <Route
            path="member"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />

          {/* Shared */}
          <Route
            path="tasks"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🧭 Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
