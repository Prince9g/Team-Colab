const AddTaskModal = ({ isOpen, onClose, onAddTask, members }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value.trim();
    const assignee = form.assignee.value;

    if (!title) return;

    onAddTask({
      id: Date.now(),
      title,
      assignee,
      status: "todo",
    });

    form.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Add New Task
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Task Title
            </label>
            <input
              name="title"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Assign To
            </label>
            <select
              name="assignee"
              className="w-full border rounded px-3 py-2"
              required
            >
              {members.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
