import axios from "axios";

const API_URL = "http://localhost:8080/auth"; 

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Login response:", response.data); 
    if (response.data.token && response.data.user) {
      const userData = {
        fullName: response.data.user.fullName,
        role: response.data.user.role,
        email: response.data.user.email,
        mobileNo: response.data.user.mobileNo,
        userId: response.data.user.id,
        flatNumber: response.data.user.flatNumber,
      };


      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token); 
     

    }
    console.log("Stored Role:", localStorage.getItem("role"));
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};






export default { login, authHeader};
