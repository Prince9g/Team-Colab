const nextStatusMap = {
  Todo: { label: "Start", value: "InProgress" },
  InProgress: { label: "Complete", value: "Done" },
  Done: null,
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

