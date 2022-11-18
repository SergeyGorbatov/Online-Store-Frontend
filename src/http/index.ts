import axios from "axios";
import { authResponse } from "models/response/authResponse";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get<authResponse>(`${process.env.REACT_APP_URL}/auth/refresh`, {
          withCredentials: true,
        });
        return $api.request(originalRequest);
      } catch (err) {
        throw error.response.data;
      }
    }
    throw error.response.data;
  }
);

export default $api;
