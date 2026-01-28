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

const COLORS = {
  todo: "#f87171",
  inProgress: "#facc15",
  done: "#22c55e",
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

        const normalized = (tasks || []).map((t) => ({
          ...t,
          status: t.status || "Todo",
        }));

        const newCounts = { Todo: 0, InProgress: 0, Done: 0 };

        normalized.forEach((t) => {
          if (newCounts[t.status] !== undefined) {
            newCounts[t.status] += 1;
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

  const total =
    counts.Todo + counts.InProgress + counts.Done;

  const chartData = [
    { name: "Todo", key: "Todo", value: counts.Todo },
    {
      name: "In Progress",
      key: "InProgress",
      value: counts.InProgress,
    },
    { name: "Done", key: "Done", value: counts.Done },
  ].filter((d) => d.value > 0);

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
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[entry.key]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v} tasks`} />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatusChart;
