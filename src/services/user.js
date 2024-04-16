import axios from "axios";

const baseUrl = "http://localhost:3000/api/users";

const createUser = async (userObject) => {
  const response = await axios.post(baseUrl, userObject);
  return response.data;
};

export default { createUser };
