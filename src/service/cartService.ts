import { AxiosResponse } from "axios";
import $api from "http/index";

const addProductCart = async (id: number): Promise<AxiosResponse> => {
  return await $api.post(`/carts/${id}`);
};

const removeProductCart = async (id: number): Promise<AxiosResponse> => {
  return await $api.delete(`/carts/${id}`);
};

const getProductsCarts = async (): Promise<AxiosResponse> => {
  return await $api.get(`/carts`);
};

const clearCart = async (): Promise<AxiosResponse> => {
  return await $api.delete(`/carts`);
};

export { addProductCart, removeProductCart, getProductsCarts, clearCart };
