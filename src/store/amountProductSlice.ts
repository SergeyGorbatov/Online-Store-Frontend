import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductCart,
  getProductsCarts,
  removeProductCart,
  clearCart,
} from "service/cartService";

type IAmountProducts = {
  basket: any;
  amountProducts: any;
  error: any;
  loadingBasket: string;
};

const initialState: IAmountProducts = {
  basket: [],
  amountProducts: {},
  error: null,
  loadingBasket: "idle",
};

export const increment = createAction("increment", (id) => {
  return {
    payload: id,
  };
});

export const decrement = createAction("decrement", (id) => {
  return {
    payload: id,
  };
});

export const increaseProductCart = createAsyncThunk<any, number>(
  "increase",
  async (id, { rejectWithValue }) => {
    try {
      await addProductCart(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const decreaseProductCart = createAsyncThunk<any, number>(
  "decrease",
  async (id, { rejectWithValue }) => {
    try {
      await removeProductCart(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBasket = createAsyncThunk<any>(
  "getBasket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsCarts();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearBasket = createAsyncThunk<any>(
  "clearBasket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const amountProductSlice = createSlice({
  name: "amountProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(increment, (state, action) => {
        if (!state.amountProducts.hasOwnProperty(action.payload)) {
          state.amountProducts[action.payload] = 0;
        }

        state.amountProducts[action.payload] =
          state.amountProducts[action.payload] + 1;
      })
      .addCase(decrement, (state, action) => {
        if (!state.amountProducts.hasOwnProperty(action.payload)) {
          state.amountProducts[action.payload] = 0;
        }

        if (state.amountProducts[action.payload] > 1) {
          state.amountProducts[action.payload] =
            state.amountProducts[action.payload] - 1;
          return;
        }

        state.amountProducts[action.payload] = 0;
      })
      .addCase(getBasket.pending, (state) => {
        state.error = null;
        state.loadingBasket = "loading";
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.error = null;
        state.loadingBasket = "idle";
        state.basket = action.payload;
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingBasket = "failed";
      });
  },
});

export default amountProductSlice.reducer;
