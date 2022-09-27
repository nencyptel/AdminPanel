import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HttpService from "../../utils/http.service";

export const LoginData = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
    try {
       const res= await axios.post(`${HttpService.login}`, data)
        
          const token = res.data?.token?.token;
          localStorage.setItem("userToken", token);
          return res;
      
    } catch (error) {
        // return custom error message from API if any
          console.log(error.response);  
          return rejectWithValue(error.response.data);
      
    }
});

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;

console.log(userToken + "token");

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    is_loggin: false,
    success: false,
};

const loginServiceSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("userToken"); // deletes token from storage
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
    },
    extraReducers: {
        // login user
        [LoginData.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [LoginData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.is_loggin = true;
            state.error = payload;
            state.userToken = localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;
        },
        [LoginData.rejected]: (state, payload ) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

// export actions
export const { logout } = loginServiceSlice.actions;
export default loginServiceSlice.reducer;
