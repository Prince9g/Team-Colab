import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const base =
    "block px-4 py-2 rounded hover:bg-gray-700 transition";

  return (
    <aside className="w-60 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        Task Manager
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
