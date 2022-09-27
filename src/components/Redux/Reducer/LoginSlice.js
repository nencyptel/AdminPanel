import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from'axios';

export const LoginData = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
      try {
     
        const res = await axios.post(
          'http://localhost:4001/get/user/login',
        data,
   
        )
        const token=res.data?.token?.token

        // store user's token in local storage
        if(localStorage.setItem('userToken', token)){
          return res;
        }
    

      } catch (error) {
        // return custom error message from API if any
        
          return rejectWithValue(error);
        
      }
    }
  )

  // initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
? localStorage.getItem('userToken')
: null


console.log(userToken+"token")

const initialState = {
loading: false,
userInfo: null,
userToken,
error: null,
is_loggin:false,
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
    state.is_loggin=true
    state.userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null
  },
  [LoginData.rejected]: (state, { payload }) => {
    state.loading = false
    state.error = payload
  },

},
});


export default loginServiceSlice.reducer;