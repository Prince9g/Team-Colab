import api from "./api";

// 🔹 Get tasks assigned to a user
export const getUserTasks = async (userId) => {
  const res = await api.get(`/user/getUserTask/${userId}`);
  return res.data.task; // backend sends { task }
};

// 🔹 Get all tasks (admin)
export const getAllTasks = async () => {
  const res = await api.get("/user/allTasks");
  console.log("Fetched tasks:", res.data.tasks);
  return res.data.tasks; // backend sends { tasks }
};

export const createTask = async (payload) => {
  const res = await api.post("/task/createTask", payload);
  return res.data.task;
};