import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
  async (config) => {
    // Get the session (which contains the JWT token)
    const session = await getSession();

    console.log(session)
    
    if (session?.token) {
      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;