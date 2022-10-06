import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HttpService from "../../utils/http.service";


export const CreateUserData = createAsyncThunk("newuser/createuser", async (data, { rejectWithValue }) => {
    try {
       const res= await axios.post(`${HttpService.Register}`, data)
        
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

const RegisterServiceSlice = createSlice({
    name: "newuser",
    initialState,
  
    extraReducers: {
        // login user
        [CreateUserData.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [CreateUserData.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.is_loggin = true;
            state.error = payload;
           
        },
        [CreateUserData.rejected]: (state, payload ) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

// export actions

export default RegisterServiceSlice.reducer;
