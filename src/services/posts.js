import axios from "axios";
const baseUrl = "http://localhost:3000/posts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (postObject) => {
  const response = await axios.post(baseUrl, postObject);
  return response.data;
};

export default { getAll, create };
