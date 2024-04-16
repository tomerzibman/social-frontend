import axios from "axios";
const baseUrl = "http://localhost:3000/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { login };
