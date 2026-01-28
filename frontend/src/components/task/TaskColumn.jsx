import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onStatusChange, isAdmin }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        {title} ({tasks.length})
      </h3>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-xs text-gray-400">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={onStatusChange}
              isAdmin={isAdmin}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;


