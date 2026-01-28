import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import LeadDashboard from "./pages/LeadDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./store/AuthContext";

const RootRedirect = () => {
  const { user } = useAuth();

  return (
    <Navigate
      to={user?.role === "lead" ? "/dashboard" : "/member"}
      replace
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Layout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["lead", "member"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* ✅ / root handler */}
          <Route index element={<RootRedirect />} />

          {/* Lead only */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["lead"]}>
                <LeadDashboard />
              </ProtectedRoute>
            }
          />

          {/* Member only */}
          <Route
            path="member"
            element={
              <ProtectedRoute allowedRoles={["member"]}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />

          {/* Shared */}
          <Route
            path="tasks"
            element={
              <ProtectedRoute allowedRoles={["lead", "member"]}>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🧭 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
