import { AxiosResponse } from "axios";
import $api from "http/index";

const addProductFavorite = async (id: number): Promise<AxiosResponse> => {
  return await $api.post(`/favorites/${id}`);
};

export { addProductFavorite };
