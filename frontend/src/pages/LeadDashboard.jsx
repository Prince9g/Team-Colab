import { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import StatusChart from "../components/dashboard/StatusChart";
import TeamStatus from "../components/dashboard/TeamStatus";
import AddTaskModal from "../components/task/AddTaskModal";
import Loader from "../components/common/Loader";

import { getAllTasks, createTask } from "../services/taskApi";
import { getAllUsers } from "../services/userApi";

const LeadDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tasksData, usersData] = await Promise.all([
          getAllTasks(),   // admin → all tasks
          getAllUsers(),   // all users
        ]);

        setTasks(tasksData);
        setMembers(usersData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 🔹 Create task via backend
  const handleAddTask = async (payload) => {
    try {
      const newTask = await createTask(payload);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Task creation failed", error);
    }
  };

  if (loading) return <Loader />;

  // 🔹 Stats (derived from backend tasks)
  const stats = [
    { title: "Total Tasks", value: tasks.length },
    {
      title: "Completed Tasks",
      value: tasks.filter((t) => t.status === "Done").length,
    },
    {
      title: "Pending Tasks",
      value: tasks.filter((t) => t.status === "InProgress" || t.status === "Todo").length,
    },
    {
      title: "Team Members",
      value: members.filter((u) => u.role === "user").length,
    },
  ];


  // 🔹 Team list (only normal users)
  const teamMembers = members
    .filter((u) => u.role === "user")
    .map((u) => ({
      _id: u._id,
      name: u.name,
      online: u.status === "active", // temporary mapping
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Lead Dashboard</h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded text-sm"
        >
          + Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      {/* Analytics + Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatusChart />
        </div>

        <TeamStatus members={teamMembers} />
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={handleAddTask}
        members={teamMembers}
      />
    </div>
  );
};

export default LeadDashboard;
