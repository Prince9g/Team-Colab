import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../store/AuthContext";
import { getAllTasks, getUserTasks } from "../../services/taskApi";
import Loader from "../common/Loader";

// 🔑 keys now MATCH chartData keys
const COLORS = {
  Todo: "#f87171",        // red
  InProgress: "#facc15", // yellow
  Done: "#22c55e",       // green
};

const StatusChart = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    Todo: 0,
    InProgress: 0,
    Done: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        let tasks = [];

        if (user?.role === "admin") {
          tasks = await getAllTasks();
        } else if (user?._id) {
          tasks = await getUserTasks(user._id);
        }

        const newCounts = { Todo: 0, InProgress: 0, Done: 0 };

        (tasks || []).forEach((t) => {
          const status = t.status || "Todo";
          if (newCounts[status] !== undefined) {
            newCounts[status]++;
          }
        });

        setCounts(newCounts);
      } catch (err) {
        console.error("Failed to fetch tasks for chart", err);
        setCounts({ Todo: 0, InProgress: 0, Done: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchTasks();
  }, [user?._id]);

  const total = counts.Todo + counts.InProgress + counts.Done;

  const chartData = [
    { name: "Todo", key: "Todo", value: counts.Todo },
    { name: "In Progress", key: "InProgress", value: counts.InProgress },
    { name: "Done", key: "Done", value: counts.Done },
  ].filter((d) => d.value > 0);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-sm font-medium text-gray-600 mb-4">
          Task Status Overview
        </h3>
        <div className="h-64 flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-600 mb-1">
        Task Status Overview
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Total Tasks: <span className="font-medium">{total}</span>
      </p>

      {total === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-gray-400">
          No tasks available
        </div>
      ) : (
       <div className="h-72">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
      <Pie
        data={chartData}
        cx="50%"
        cy="55%"
        innerRadius={60}
        outerRadius={90}
        dataKey="value"
        labelLine={false}
        label={({ percent }) =>
          `${(percent * 100).toFixed(0)}%`
        }
      >
        {chartData.map((entry) => (
          <Cell
            key={entry.key}
            fill={COLORS[entry.key]}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </Pie>

      <Tooltip
        formatter={(value, name) => [`${value} tasks`, name]}
        contentStyle={{
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      />

      <Legend verticalAlign="bottom" />
    </PieChart>
  </ResponsiveContainer>
</div>
      )}
    </div>
  );
};

export default StatusChart;
