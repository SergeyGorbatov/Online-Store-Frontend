import { configureStore } from "@reduxjs/toolkit";
import authReducer from "store/authenticationSlice";
import searchReducer from "store/searchSlice";
import newProductsReducer from "store/newProductsSlice"
import amountProductReducer from 'store/amountProductSlice'
import favoriteProductsReducer from "store/favoriteProductsSlice";
import filteringProductSlice from "store/filteringProductSlice";

const store = configureStore({
  reducer: {
    authentication: authReducer,
    search: searchReducer,
    newProducts: newProductsReducer,
    amountProduct: amountProductReducer,
    favorite: favoriteProductsReducer,
    certainProducts: filteringProductSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
