import { AxiosResponse } from "axios";
import $api from "http/index";

const getProduct = async (id: number): Promise<AxiosResponse> => {
  return await $api.get(`/products/${id}`);
};

const getProducts = async (searchName: string): Promise<AxiosResponse> => {
  return await $api.get(
    `/products/search/?search=${searchName}&pageSize=${5}&pageNumber=${0}`
  );
};

const getNewProducts = async (): Promise<AxiosResponse> => {
  return await $api.get(`/products/new/?size=15`);
};

const getFilteredProducts = async (
  sortOrder: string,
  filterBy: string,
  last: string,
  sortBy: string,
  filterOrder: string
): Promise<AxiosResponse> => {
  return await $api.get(
    `/products/?sortOrder=${sortOrder}&filterBy=${filterBy}&last=${last}&sortBy=${sortBy}&filterOrder=${filterOrder}`
  );
};

export { getProduct, getProducts, getNewProducts, getFilteredProducts };
