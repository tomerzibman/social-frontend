import axios from "axios";

const baseUrl = "http://localhost:3000/api/conversations";

const getConversationsForUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

const createConversation = async (convoObj) => {
  const response = await axios.post(baseUrl, convoObj);
  return response.data;
};

export default { getConversationsForUser, createConversation };
