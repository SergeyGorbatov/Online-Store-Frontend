import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registration,
  login,
  refresh,
  logOut,
  checkUserAuthorization,
} from "service/authService";
import { typeUserRegistration, typeUserAuthorization } from "types";

type AuthState = {
  loadingLogin: string;
  loadingRegistration: string;
  loadingGetUserAuthentication: string;
  errorRegistration: any;
  errorLogin: any;
  errorRefreshToken: any;
  errorLogout: any;
  errorAuth: any;
  user: object;
  auth: boolean | null;
};

const initialState: AuthState = {
  loadingLogin: "idle",
  loadingRegistration: "idle",
  loadingGetUserAuthentication: "idle",
  errorRegistration: null,
  errorLogin: null,
  errorRefreshToken: null,
  errorLogout: null,
  errorAuth: null,
  user: {},
  auth: null,
};

export const addNewUser = createAsyncThunk<object, typeof typeUserRegistration>(
  "registration",
  async (user, { rejectWithValue }) => {
    try {
      const response = await registration(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk<object, typeof typeUserAuthorization>(
  "login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk<any>(
  "refresh",
  async (_, { rejectWithValue }) => {
    try {
      await refresh();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await logOut();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAuthentication = createAsyncThunk<any>(
  "checkout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkUserAuthorization();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.loadingRegistration = "loading";
        state.errorRegistration = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loadingRegistration = "idle";
        state.errorRegistration = null;
        state.user = action.payload;
        state.auth = true;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loadingRegistration = "failed";
        state.errorRegistration = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.loadingLogin = "loading";
        state.errorLogin = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loadingLogin = "idle";
        state.errorLogin = null;
        state.user = action.payload;
        state.auth = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loadingLogin = "failed";
        state.errorLogin = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.errorRefreshToken = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.errorRefreshToken = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.errorRefreshToken = action.payload;
      })
      .addCase(getUserAuthentication.pending, (state) => {
        state.loadingGetUserAuthentication = "loading";
        state.errorAuth = null;
      })
      .addCase(getUserAuthentication.fulfilled, (state, action) => {
        state.loadingGetUserAuthentication = "idle";
        state.errorAuth = null;
        state.auth = action.payload;
      })
      .addCase(getUserAuthentication.rejected, (state, action) => {
        state.loadingGetUserAuthentication = "failed";
        state.errorAuth = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.errorLogout = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.errorLogout = null;
        state.user = {};
        state.auth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.errorLogout = action.payload;
      });
  },
});

export default usersSlice.reducer;
