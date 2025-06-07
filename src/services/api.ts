import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response, // Directly return successful responses
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Don't logout if the original request was to the login/register endpoint
      const originalRequestUrl = error.config.url;
      if (!originalRequestUrl?.includes('/login') && !originalRequestUrl?.includes('/register')) {
        const { logout } = useAuthStore.getState();
        logout();
        // Reloading the page will automatically redirect to the login page
        // because of the logic in your routing setup.
        window.location.reload(); 
        console.error("Session expired or token is invalid. User logged out.");
      }
    }
    return Promise.reject(error);
  }
);

export default api; 