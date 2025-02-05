import axios from 'axios';

const API_URL = "http://localhost:8080/resident/register"; 

const registerResident = async (residentData) => {
  try {
    const response = await axios.post(API_URL, residentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Error registering resident";
  }
  
};

export default {
  registerResident,
};
