const nextStatusMap = {
  todo: { label: "Start", value: "inProgress" },
  inProgress: { label: "Complete", value: "done" },
  done: null,
};

const StatusButton = ({ currentStatus, onChange }) => {
  const next = nextStatusMap[currentStatus];

  if (!next) return null;

  return (
    <button
      onClick={() => onChange(next.value)}
      className="mt-3 text-xs px-3 py-1 rounded bg-gray-900 text-white hover:bg-gray-800 transition"
    >
      {next.label}
    </button>
  );
};

export default StatusButton;
