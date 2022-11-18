import { AxiosResponse } from "axios";
import $api from "http/index";
import { authResponse } from "models/response/authResponse";
import { typeUserRegistration, typeUserAuthorization } from "types";

const login = async (
  data: typeof typeUserAuthorization
): Promise<AxiosResponse<authResponse>> => {
  return await $api.post<authResponse>("auth/login", data);
};

const registration = async (
  data: typeof typeUserRegistration
): Promise<AxiosResponse<authResponse>> => {
  return await $api.post<authResponse>("auth/registration", data);
};

const refresh = async (): Promise<AxiosResponse> => {
  return await $api.get("auth/refresh", {
    withCredentials: true,
  });
};

const logOut = async (): Promise<AxiosResponse> => {
  return await $api.get("/auth/logout");
};

const checkUserAuthorization = async (): Promise<AxiosResponse> => {
  return await $api.get("/auth/checkout");
};

export { registration, login, refresh, logOut, checkUserAuthorization };
