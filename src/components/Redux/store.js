import { configureStore } from "@reduxjs/toolkit";

import loginServiceSlice from "./Reducer/LoginSlice";
import RegisterServiceSlice from "./Reducer/createUserSlice";
import fetchUserSlice from "./Reducer/fetchUserSlice";

export const store = configureStore({
    reducer: {
        user: loginServiceSlice,
        newuser: RegisterServiceSlice,
        userprofile: fetchUserSlice,
    },
});

export default store;
