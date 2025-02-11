import axios from "axios";

// Get user details by ID
export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/auth/getall/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUser = async (id, userData, token) => {
  try {
    //   console.log("Sending Update Request:", { id, userData, token }); // Debug log

    const response = await axios.put(
      `http://localhost:8080/auth/updateone/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in updateUser service:", error);
    throw error;
  }
};
