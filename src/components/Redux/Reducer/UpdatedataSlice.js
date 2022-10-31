import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HttpService from "../../utils/http.service";


export const UpdateData = createAsyncThunk("updateduser/userDetail", async ({data ,userId}, { rejectWithValue }) => {
    try {
       const res= await axios.post(`${HttpService.updateUser}/${userId}`, data)
       console.log(res,data , HttpService.updateUser,"from slice")
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
    is_loggin: false,
    success: false,
};

const updateUserServiceSlice = createSlice({
    name: "updateduser",
    initialState,
    reducers: {},
    extraReducers: {
        // login user
        [UpdateData.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [UpdateData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.error = payload;
            
        },
        [UpdateData.rejected]: (state, payload ) => {
            state.loading = false;
            state.error = payload;
        },
    },
});


export default updateUserServiceSlice.reducer;
