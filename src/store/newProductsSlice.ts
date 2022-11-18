import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNewProducts } from "service/productService";

type newProductsState = {
  newProducts: any[];
  error: any;
};

const initialState: newProductsState = {
  error: null,
  newProducts: [],
};

export const getNovelties = createAsyncThunk<any>(
  "newProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNewProducts();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNovelties.pending, (state) => {
        state.error = null;
      })
      .addCase(getNovelties.fulfilled, (state, action) => {
        state.newProducts = action.payload;
      })
      .addCase(getNovelties.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default newProductsSlice.reducer;
