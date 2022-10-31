import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import loginServiceSlice from "./Reducer/LoginSlice";
import RegisterServiceSlice from "./Reducer/createUserSlice";
import fetchUserSlice from "./Reducer/fetchUserSlice";
import fetchUserAccesiblepageSlice from './Reducer/AccesiblepageSlice'
import updateUserServiceSlice from "./Reducer/UpdatedataSlice";

export const store = configureStore({
    reducer: {
        user: loginServiceSlice,
        newuser: RegisterServiceSlice,
        userprofile: fetchUserSlice,
        accesiblepage:fetchUserAccesiblepageSlice,
        updateduser:updateUserServiceSlice
    },
    middleware: [thunk, logger]
});

export default store;
