import { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import { useAuth } from "../store/AuthContext";
import Loader from "../components/common/Loader";
import api from "../services/api";

const MemberDashboard = () => {
  const { user, setUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ derive initial state from DB
  const [isOnline, setIsOnline] = useState(
    user?.status === "active"
  );
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(
          `/user/getUserTask/${user._id}`
        );
        setTasks(res.data.task);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchTasks();
  }, [user?._id]);

  // ✅ backend-driven toggle
  const toggleStatus = async () => {
    const newStatus = isOnline ? "inactive" : "active";

    try {
      setUpdatingStatus(true);

      await api.patch(`/user/changestatus/${user._id}`, {
        status: newStatus,
      });

      setIsOnline(newStatus === "active");

      // keep auth context in sync
      setUser((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <Loader />;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "Done"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const progressPercent =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Member Dashboard
        </h2>

        {/* Online / Offline Toggle */}
        <button
          onClick={toggleStatus}
          disabled={updatingStatus}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition ${
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          } ${
            updatingStatus
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {isOnline ? "Online" : "Offline"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="My Tasks" value={totalTasks} />
        <StatsCard title="Completed" value={completedTasks} />
        <StatsCard title="Pending" value={pendingTasks} />
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-5 max-w-md">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Task Progress
        </h3>

        <div className="flex justify-between text-sm mb-1">
          <span>Completed</span>
          <span>{progressPercent}%</span>
        </div>

        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
