import api from "./api";

// 🔹 Fetch all users (admin only)
export const getAllUsers = async () => {
  const res = await api.get("/user/getalluser"); // adjust route if needed
  return res.data.users;
};
