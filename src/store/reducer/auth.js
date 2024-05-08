/* eslint-disable no-unused-vars */
import api from "../../services/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AlertService from "../../services/alertService";
const userInstance = JSON.parse(localStorage.getItem("user_instance"));
const accessToken = localStorage.getItem("access_token");
const id_number = localStorage.getItem("id_number");
const user_type = localStorage.getItem("user_type");
const initialState = {
  userId: id_number ? id_number : null,
  userType: user_type ? user_type : null,
  user: userInstance ? userInstance : null,

  access_token: accessToken ? accessToken : null,
  isLoggedIn: userInstance && accessToken ? true : false,
  isLoading: false,
};

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data, thunkAPI) => {
    try {
      const res = await api.CreateAccount(data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const createJobSeekerProfile = createAsyncThunk(
  "auth/createJobSeekerProfile",
  async (data, thunkAPI) => {
    try {
      const res = await api.CreateJobSeekerProfile(data);
      return res;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const createEmployerProfile = createAsyncThunk(
  "auth/createEmployerProfile",
  async (data, thunkAPI) => {
    try {
      const res = await api.CreateEmployerProfile(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (data, thunkAPI) => {
    try {
      const res = await api.LoginUser(data);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Hwloeodk from  reducer");
      console.log(state);
      state.user = null;
      state.access_token = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },

    saveUser: (state, arg) => {
      console.log(state);
      console.log(arg);
      state.user = arg.payload;
      localStorage.setItem("user_instance", JSON.stringify(arg.payload));
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        let { data } = action.payload;
        if (!data.body.profile_setup) {
          state.userId = data.body.id;
          state.userType = data.body.type;
          localStorage.setItem("id_number", data.body.id);
          localStorage.setItem("user_type", data.body.type);
          AlertService.displaySuccessAlert("Please setup your profile");
        } else {
          console.log(data);
          AlertService.displaySuccessAlert(data.response_description);
          state.access_token = data.accessToken;
          state.user = data.body;
          state.isLoggedIn = true;
          localStorage.setItem("access_token", data.accessToken);
          localStorage.setItem("user_instance", JSON.stringify(data.body));
        }

        state.isLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        let { payload } = action;
        AlertService.displayErrorAlert(payload.data.response_description);
      })
      .addCase(createEmployerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        console.log(payload);

        if (payload.status === 201) {
          AlertService.displaySuccessAlert(payload.data.response_description);
          state.access_token = payload.data.accessToken;
          state.user = payload.data.body;
          localStorage.setItem("access_token", payload.data.accessToken);
          localStorage.setItem(
            "user_instance",
            JSON.stringify(payload.data.body)
          );
        } else {
          AlertService.displayErrorAlert(payload.data.response_description);
        }
      })
      .addCase(createEmployerProfile.rejected, (state, action) => {
        state.isLoading = false;
        AlertService.displayErrorAlert(
          action.payload.data.response_description
        );
      })
      .addCase(createJobSeekerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJobSeekerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action);
        const { payload } = action;
        console.log(payload);

        if (payload.status === 201) {
          AlertService.displaySuccessAlert(payload.data.response_description);
          state.access_token = payload.data.accessToken;
          state.user = payload.data.body;
          localStorage.setItem("access_token", payload.data.accessToken);
          localStorage.setItem(
            "user_instance",
            JSON.stringify(payload.data.body)
          );
        } else {
          AlertService.displayErrorAlert(payload.data.response_description);
        }
      })
      .addCase(createJobSeekerProfile.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.isLoading = false;
        AlertService.displayErrorAlert(
          action.payload.data.response_description
        );
      })
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
        const { payload } = action;
        console.log(payload);

        if (payload.status === 200) {
          AlertService.displaySuccessAlert(
            action.payload.data.response_description
          );
          state.userId = payload.data.body.id;
          state.userType = payload.data.body.type;
          localStorage.setItem("id_number", payload.data.body.id);
          localStorage.setItem("user_type", payload.data.body.type);
        }
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        AlertService.displayErrorAlert(
          action.payload.data.response_description
        );
      });
  },
});

export const { saveUser, logout } = authReducer.actions;

export default authReducer.reducer;
