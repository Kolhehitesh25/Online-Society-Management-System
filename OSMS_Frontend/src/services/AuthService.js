import axios from "axios";

const API_URL = "http://localhost:8080/auth"; 

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role); //my backend response contains user and user contains the role
      localStorage.setItem("fullName", response.data.user.fullName);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("email",response.data.user.email);
      localStorage.setItem("mobileNo", response.data.user.mobileNo);
      localStorage.setItem("flatNumber", response.data.user.flatNumber);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Function to get headers with token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// const getUserDetails = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/user`, { headers: authHeader() });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user details:", error.response?.data || error.message);
//     throw error;
//   }
// };



export default { login, authHeader};
