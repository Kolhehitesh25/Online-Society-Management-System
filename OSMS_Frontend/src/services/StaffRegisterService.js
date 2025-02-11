
import axios from 'axios'

const API_URL = "http://localhost:8080/staff/register"; 

const registerStaff = async(staffData) => {
    try {
        const response = await axios.post(API_URL, staffData);
        return response.data;
      } catch (error) {
        throw error.response ? error.response.data : "Error registering resident";
      }
    
    };
   


export default {
    registerStaff,
}
