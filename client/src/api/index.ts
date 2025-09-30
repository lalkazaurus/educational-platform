import axios from "axios";
import { getErrorMessage } from "./getErrorMessage";
import { toast } from "react-hot-toast"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    const message = getErrorMessage(error);
    toast.error(message, {
      style: {
        border: '3px solid black',
        background: '#ffeb3b',
        color: '#000',
        padding: '12px 16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: '4px 4px 0px #000',
        borderRadius: '0.5rem',
        transform: 'rotate(-1deg)',
      },
      iconTheme: {
        primary: '#d32f2f',
        secondary: '#fff',
      },
    });

    return Promise.reject(error);
  }
);

export default api;
