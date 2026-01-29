import api from "../../services/api"; // adjust path if needed

const nextStatusMap = {
  Todo: { label: "Start", value: "InProgress" },
  InProgress: { label: "Complete", value: "Done" },
  Done: null,
};

const StatusButton = ({ taskId, currentStatus, onChange }) => {
  const next = nextStatusMap[currentStatus];

  if (!next) return null;

  const handleChange = async () => {
    try {
      await api.patch(`/task/updateTask/${taskId}/${next.value}`);
      onChange(next.value); // update UI optimistically
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  return (
    <button
      onClick={handleChange}
      className="mt-3 text-xs px-3 py-1 rounded bg-gray-900 text-white hover:bg-gray-800 transition"
    >
      {next.label}
    </button>
  );
};

export default StatusButton;
