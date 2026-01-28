import { useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import StatusChart from "../components/dashboard/StatusChart";
import TeamStatus from "../components/dashboard/TeamStatus";
import AddTaskModal from "../components/task/AddTaskModal";

const LeadDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const stats = [
    { title: "Total Tasks", value: tasks.length },
    {
      title: "Completed Tasks",
      value: tasks.filter((t) => t.status === "done").length,
    },
    {
      title: "Pending Tasks",
      value: tasks.filter((t) => t.status !== "done").length,
    },
    { title: "Team Members", value: 5 },
  ];

  const statusData = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "inProgress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const teamMembers = [
    { id: 1, name: "Amit", online: true },
    { id: 2, name: "Priya", online: false },
    { id: 3, name: "Rohit", online: true },
    { id: 4, name: "Neha", online: true },
    { id: 5, name: "Karan", online: false },
  ];

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Lead Dashboard
        </h2>

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
          <StatusChart data={statusData} />
        </div>

        <TeamStatus members={teamMembers} />
      </div>

      {/* Modal */}
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
