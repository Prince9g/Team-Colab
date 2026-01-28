import { useEffect, useState } from "react";
import TaskColumn from "../components/task/TaskColumn";
import { useAuth } from "../store/AuthContext";
import Loader from "../components/common/Loader";
import { getAllTasks, getUserTasks } from "../services/taskApi";

const Tasks = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch tasks based on role
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let data = [];

        if (user.role === "admin") {
          // Admin sees ALL tasks
          data = await getAllTasks();
        } else {
          // User sees only assigned tasks
          data = await getUserTasks(user._id);
        }

        // 🔹 Defensive: ensure status exists (MATCH FILTER VALUES)
        const normalized = data.map((task) => ({
          ...task,
          status: task.status || "Todo",
        }));

        setTasks(normalized);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchTasks();
    }
  }, [user?._id]);

  // 🔄 Status update (UI only for now)
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Tasks Board
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {user.role === "admin"
            ? "All tasks across the team"
            : "Track and manage your work"}
        </p>
      </div>

      {/* Board */}
      <div className="bg-gray-50 rounded-xl p-4">
        {user.role === "admin" ? (
          <TaskColumn
            title="All Tasks"
            tasks={tasks}
            isAdmin={true}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskColumn
              title="Todo"
              tasks={tasks.filter((t) => t.status === "Todo")}
              onStatusChange={handleStatusChange}
              isAdmin={false}
            />

            <TaskColumn
              title="In Progress"
              tasks={tasks.filter((t) => t.status === "InProgress")}
              onStatusChange={handleStatusChange}
              isAdmin={false}
            />

            <TaskColumn
              title="Done"
              tasks={tasks.filter((t) => t.status === "Done")}
              onStatusChange={handleStatusChange}
              isAdmin={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
