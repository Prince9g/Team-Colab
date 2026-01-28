const AddTaskModal = ({ isOpen, onClose, onAddTask, members }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const payload = {
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      assignedTo: form.assignee.value, // USER _id
      priority: form.priority.value,
      deadline: form.deadline.value,
    };

    if (!payload.title || !payload.assignedTo || !payload.deadline) {
      return;
    }

    onAddTask(payload); // 🔥 backend-ready payload
    form.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Task Title</label>
            <input
              name="title"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              className="w-full border rounded px-3 py-2"
              rows="2"
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm mb-1">Assign To</label>
            <select
              name="assignee"
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm mb-1">Priority</label>
            <select
              name="priority"
              className="w-full border rounded px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium" defaultValue>
                Medium
              </option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Actions */}
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
