import axios from "axios";

const baseUrl = "http://localhost:3000/api/users";

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUsersByUsername = async (search) => {
  const response = await axios.get(`${baseUrl}?search=${search}`);
  return response.data;
};

const createUser = async (userObject) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(baseUrl, userObject, config);
  return response.data;
};

export default { getUsers, getUserById, getUsersByUsername, createUser };
