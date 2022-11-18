import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { getProducts } from "service/productService";

type searchState = {
  searchResult: any[];
  error: string | null;
};

const initialState: searchState = {
  error: null,
  searchResult: [],
};

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const searchProducts = createAsyncThunk<any, string>(
  "search",
  async (searchName, { rejectWithValue }) => {
    try {
      const response = await getProducts(searchName);
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const searchSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
