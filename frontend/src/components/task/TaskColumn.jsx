import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";

const TaskColumn = ({ title, tasks, onStatusChange }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-gray-500">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <EmptyState message="No tasks here" />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;

