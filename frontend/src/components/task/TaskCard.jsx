import StatusButton from "./StatusButton";

const statusStyles = {
  Todo: "bg-red-100 text-red-700",
  InProgress: "bg-yellow-100 text-yellow-700",
  Done: "bg-green-100 text-green-700",
};

const priorityStyles = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-purple-100 text-purple-700",
};

const TaskCard = ({ task, onStatusChange, isAdmin }) => {
  const status = task.status || "Todo";

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-gray-800">
          {task.title}
        </h4>

        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            statusStyles[status]
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Assignee */}
        {task.assignedTo?.name && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            👤 {task.assignedTo.name}
          </span>
        )}

        {/* Priority */}
        {task.priority && (
          <span
            className={`px-2 py-0.5 rounded ${
              priorityStyles[task.priority]
            }`}
          >
            ⚡ {task.priority}
          </span>
        )}

        {/* Deadline */}
        {task.deadline && (
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
            ⏰ {new Date(task.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Actions */}
      {!isAdmin && onStatusChange && (
        <div className="pt-2">
          <StatusButton
            currentStatus={status}
            onChange={(newStatus) =>
              onStatusChange(task._id, newStatus)
            }
          />
        </div>
      )}
    </div>
  );
};



export default TaskCard;
