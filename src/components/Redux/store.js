import { configureStore } from '@reduxjs/toolkit';

import loginServiceSlice from './Reducer/LoginSlice';



export const store = configureStore({
  reducer: {

    user: loginServiceSlice,

  },
});


export default store;

