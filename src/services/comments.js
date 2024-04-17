import axios from "axios";

const baseUrl = "http://localhost:3000/api/comments";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (commentObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, commentObj, config);
  return response.data;
};

export default { setToken, create };
