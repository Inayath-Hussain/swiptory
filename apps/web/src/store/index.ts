import { configureStore } from "@reduxjs/toolkit";

import { userProfileSlice } from "./slices/userProfile";
import { categoriesSlice } from "./slices/categories";
import { storiesQuerySlice } from "./slices/storiesQuery";
import { baseApiSlice } from "./apiSlice/baseApiSlice";


export const store = configureStore({
    reducer: {
        [userProfileSlice.name]: userProfileSlice.reducer,
        [categoriesSlice.name]: categoriesSlice.reducer,
        [storiesQuerySlice.name]: storiesQuerySlice.reducer,

        [baseApiSlice.reducerPath]: baseApiSlice.reducer
    },


    middleware: (defaultMiddleware) => {
        return defaultMiddleware().concat(baseApiSlice.middleware)
    }

})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;