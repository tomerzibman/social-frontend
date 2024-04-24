import axios from "axios";

const baseUrl = "http://localhost:3000/api/unreadCounts";

const getUnreadCounts = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

export default { getUnreadCounts };
