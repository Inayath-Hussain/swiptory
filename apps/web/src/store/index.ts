import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userInfo";
import { categoriesSlice } from "./slices/categories";


export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [categoriesSlice.name]: categoriesSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;