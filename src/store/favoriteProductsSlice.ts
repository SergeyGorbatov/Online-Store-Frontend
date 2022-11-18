import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductFavorite } from "service/favoritesService";

type IProductsFavorite = {
  productsFavorite: object[];
  error: any;
};

const initialState: IProductsFavorite = {
  productsFavorite: [],
  error: null,
};

export const addProductToFavorites = createAsyncThunk<any, number>(
  "addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await addProductFavorite(productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const newProductsSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(addProductToFavorites.fulfilled, (state, action) => {
        state.error = null;
        state.productsFavorite = action.payload;
      })
      .addCase(addProductToFavorites.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default newProductsSlice.reducer;
