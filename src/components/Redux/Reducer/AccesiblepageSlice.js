import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HttpService from "../../utils/http.service";

export const FetchAccesiblePage = createAsyncThunk("accesiblepage/userPageDetails", async (data, { rejectWithValue }) => {
    try {
      
        const res = await axios.get(`${HttpService.accesiblepage}/${data}`,);
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

const fetchUserAccesiblepageSlice = createSlice({
    name: "accesiblepage",
    initialState,
    reducers: {},
    extraReducers: {
      
        [FetchAccesiblePage.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [FetchAccesiblePage.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.error = payload;
            
        },
        [FetchAccesiblePage.rejected]: (state, payload) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default fetchUserAccesiblepageSlice.reducer;
