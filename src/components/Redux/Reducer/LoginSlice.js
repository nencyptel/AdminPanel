import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from'axios';
import { Post } from "../../services/api.service";

// export const LoginData = createAsyncThunk(
//     "user/LoginData",
//     async (data) => {
//       return await axios.post("http://localhost:4000/get/user/login", data).then((res) =>
//        //console.log(res)
 
//        res.data
      
//       );
    
//     }
//   );

export const LoginData = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
     
        const res = await axios.post(
          'http://localhost:4000/get/user/login',
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