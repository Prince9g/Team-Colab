const TeamStatus = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-medium mb-4">Team Status</h3>

      <ul className="space-y-3">
        {members.map((m) => {
          const isOnline = m.status === "active";

          return (
            <li
              key={m._id}
              className="flex items-center justify-between"
            >
              <span>{m.name}</span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  isOnline
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOnline
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
                {isOnline ? "Online" : "Offline"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeamStatus;


