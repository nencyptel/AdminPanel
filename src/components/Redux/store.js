import { configureStore } from '@reduxjs/toolkit';

import loginServiceSlice from './Reducer/LoginSlice';
import RegisterServiceSlice from  './Reducer/createUserSlice';


export const store = configureStore({
  reducer: {

    user: loginServiceSlice,
    newuser:RegisterServiceSlice

  },
});


export default store;

