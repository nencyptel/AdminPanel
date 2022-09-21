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
  // register user reducer...
},
});


// const loginServiceSlice = createSlice({
//     name: 'user',
//     initialState: {
//         data: [],
//         status: null,
//     },

//     extraReducers: {
//         [LoginData.pending]: (state, action) => {
//             state.status = 'loading'
//         },
//         [LoginData.fulfilled]: (state, { payload }) => {
         
//             state.status = 'success'
//             state.data = payload
//             // window.location.reload();
//         },
//         [LoginData.rejected]: (state, action) => {
//             state.status = 'failed'
          
//         },
//     },
// })

export default loginServiceSlice.reducer;