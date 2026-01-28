import { useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";

const MemberDashboard = () => {
  // 🔹 Mock availability state (API / socket later)
  const [isOnline, setIsOnline] = useState(true);

  // 🔹 Mock task stats
  const stats = [
    { title: "My Tasks", value: 7 },
    { title: "Completed", value: 3 },
    { title: "Pending", value: 4 },
  ];

  const totalTasks = 7;
  const completedTasks = 3;
  const progressPercent = Math.round(
    (completedTasks / totalTasks) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Member Dashboard
        </h2>

        {/* Online / Offline Toggle */}
        <button
          onClick={() => setIsOnline((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition ${
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
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
        {stats.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-sm p-5 max-w-md">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Task Progress
        </h3>

        <div className="flex items-center justify-between text-sm mb-1">
          <span>Completed</span>
          <span>{progressPercent}%</span>
        </div>

        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-500 rounded transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

