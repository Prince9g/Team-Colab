import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import LeadDashboard from "./pages/LeadDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login */}
        <Route path="/login" element={<Login />} />

        {/* App Pages with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<LeadDashboard />} />
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

