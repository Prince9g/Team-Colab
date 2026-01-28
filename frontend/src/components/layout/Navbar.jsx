const Navbar = () => {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-medium">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Hi, User
        </span>

        <button className="text-sm bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
