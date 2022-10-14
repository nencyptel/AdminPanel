import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HttpService from "../../utils/http.service";

export const fetchUserData = createAsyncThunk("userprofile/userDetails", async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        const res = await axios.get(`${HttpService.fetchUser}/${data}`,);
        return res;
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
};

const fetchUserServiceSlice = createSlice({
    name: "userprofile",
    initialState,
    reducers: {},
    extraReducers: {
      
        [fetchUserData.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchUserData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.error = payload;
            
        },
        [fetchUserData.rejected]: (state, payload) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default fetchUserServiceSlice.reducer;
