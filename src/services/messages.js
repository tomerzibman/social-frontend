import axios from "axios";

const baseUrl = "http://localhost:3000/api/messages";

const getMessagesForConversation = async (convoId) => {
  const response = await axios.get(`${baseUrl}/${convoId}`);
  return response.data;
};

export default { getMessagesForConversation };
