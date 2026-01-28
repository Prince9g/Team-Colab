import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // 🔄 Redirect once auth state is ready
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      navigate(
        user.role === "lead" ? "/lead" : "/member",
        { replace: true }
      );
    }
  }, [loading, isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message);
      }
      // redirect handled by useEffect
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      // 🔴 THIS IS CRITICAL (prevents infinite loading)
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Team Task Manager
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !email || !password}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
