import axios from "axios";
import { getErrorMessage } from "./getErrorMessage"; 
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore"; 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    useAuthStore.getState().logout();
                    processQueue(new Error("No refresh token"), null);
                    isRefreshing = false;
                    return reject(new Error("No refresh token available"));
                }
            
                axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`, 
                        }
                    }
                )
                .then((response) => {
                    const { accessToken, refreshToken: newRefreshToken, user } = response.data;

                    useAuthStore.getState().setLogin(user, { 
                        accessToken: accessToken, 
                        refreshToken: newRefreshToken 
                    });

                    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                    processQueue(null, accessToken);
                    
                    resolve(api(originalRequest));
                })
                .catch((refreshError) => {
                    processQueue(refreshError, null);
                    useAuthStore.getState().logout();
                    reject(refreshError);
                })
                .finally(() => {
                    isRefreshing = false;
                });
            });
        }

        if (error.response?.status !== 401) {
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
        }

        return Promise.reject(error);
    }
);

export default api;