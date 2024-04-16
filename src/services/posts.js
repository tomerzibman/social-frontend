import axios from "axios";
const baseUrl = "http://localhost:3000/api/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, postObject, config);
  return response.data;
};

const update = async (postObject, postId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${postId}`, postObject, config);
  return response.data;
};

export default { setToken, getAll, create, update };
