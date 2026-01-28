const TeamStatus = ({ members }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Team Availability
      </h3>

      <ul className="space-y-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {/* Status Dot */}
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  member.online
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />

              <span className="text-sm text-gray-800">
                {member.name}
              </span>
            </div>

            <span
              className={`text-xs font-medium ${
                member.online
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {member.online ? "Online" : "Offline"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamStatus;
