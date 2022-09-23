import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from'axios';

export const LoginData = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
      try {
     
        const res = await axios.post(
          'http://192.168.250.1:4000/get/user/login',
        data,
   
        )
        console.log(res);
        // store user's token in local storage
        localStorage.setItem('userToken', res.data.token.token)
        return res
      } catch (error) {
        // return custom error message from API if any
        
          return rejectWithValue(error);
        
      }
    }
  )

  // initialize userToken from local storage
const userToken = localStorage.getItem('token')
? localStorage.getItem('token')
: null

const initialState = {
loading: false,
userInfo: null,
userToken,
error: null,
success: false,
}

const loginServiceSlice = createSlice({
name: 'user',
initialState,
reducers: {},
extraReducers: {
  // login user
  [LoginData.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [LoginData.fulfilled]: (state, { payload }) => {
    state.loading = false
    state.userInfo = payload
    state.userToken = payload.userToken
  },
  [LoginData.rejected]: (state, { payload }) => {
    state.loading = false
    state.error = payload
  },
},
});


export default loginServiceSlice.reducer;