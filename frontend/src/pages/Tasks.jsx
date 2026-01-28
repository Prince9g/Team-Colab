import { useState } from "react";
import TaskColumn from "../components/task/TaskColumn";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design login page", status: "todo" },
    { id: 2, title: "Implement auth context", status: "inProgress" },
    { id: 3, title: "Create dashboard layout", status: "done" },
    { id: 4, title: "Build task board UI", status: "todo" },
  ]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Tasks Board
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage your work across stages
        </p>
      </div>

      {/* Board Container */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TaskColumn
            title="Todo"
            tasks={tasks.filter((t) => t.status === "todo")}
            onStatusChange={handleStatusChange}
          />

          <TaskColumn
            title="In Progress"
            tasks={tasks.filter((t) => t.status === "inProgress")}
            onStatusChange={handleStatusChange}
          />

          <TaskColumn
            title="Done"
            tasks={tasks.filter((t) => t.status === "done")}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
