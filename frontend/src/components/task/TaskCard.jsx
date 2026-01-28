import StatusButton from "./StatusButton";

const statusStyles = {
  todo: "bg-red-100 text-red-700",
  inProgress: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

const statusLabel = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow transition">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-gray-800">
          {task.title}
        </h4>

        <span
          className={`text-xs px-2 py-0.5 rounded ${statusStyles[task.status]}`}
        >
          {statusLabel[task.status]}
        </span>
      </div>

      <StatusButton
        currentStatus={task.status}
        onChange={(newStatus) =>
          onStatusChange(task.id, newStatus)
        }
      />
    </div>
  );
};

export default TaskCard;

