import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from'axios';
import { Post } from "../../services/api.service";

export const LoginData = createAsyncThunk(
    "user/LoginData",
    async (data) => {
      return await axios.post("http://localhost:4000/get/user/login", data).then((res) =>
       //console.log(res)
       res.data
      
      );
    
    }
  );


const loginServiceSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        status: null,
    },

    extraReducers: {
        [LoginData.pending]: (state, action) => {
            state.status = 'loading'
        },
        [LoginData.fulfilled]: (state, { payload }) => {
         
            state.status = 'success'
            state.data = payload
            // window.location.reload();
        },
        [LoginData.rejected]: (state, action) => {
            state.status = 'failed'
          
        },
    },
})

export default loginServiceSlice.reducer;