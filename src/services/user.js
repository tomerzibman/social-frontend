import axios from "axios";

const baseUrl = "http://localhost:3000/api/users";

const createUser = async (userObject) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(baseUrl, userObject, config);
  return response.data;
};

export default { createUser };
