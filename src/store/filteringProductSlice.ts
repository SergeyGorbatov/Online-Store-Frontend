import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFilteredProducts } from "service/productService";

type ICertainProducts = {
  iPads: any[];
  iPhone: any[];
  Mac: any[];
  Watch: any[];
  AirPods: any[];
  error: any;
};

const initialState: ICertainProducts = {
  error: null,
  iPads: [],
  iPhone: [],
  Mac: [],
  Watch: [],
  AirPods: [],
};

export const getCertainProducts = createAsyncThunk<any, any>(
  "certainProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFilteredProducts(
        data.sortOrder,
        data.filterBy,
        data.last,
        data.sortBy,
        data.filterOrder
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const certainProductsSlice = createSlice({
  name: "certainProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCertainProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(getCertainProducts.fulfilled, (state, action) => {
        if (action.payload[0].category === "iPad") {
          state.iPads = action.payload;
        }
        if (action.payload[0].category === "iPhone") {
          state.iPhone = action.payload;
        }
        if (action.payload[0].category === "Mac") {
          state.Mac = action.payload;
        }
        if (action.payload[0].category === "Watch") {
          state.Watch = action.payload;
        }
        if (action.payload[0].category === "AirPods") {
          state.AirPods = action.payload;
        }
      })
      .addCase(getCertainProducts.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default certainProductsSlice.reducer;
