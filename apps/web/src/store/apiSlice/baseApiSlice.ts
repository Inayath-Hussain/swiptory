import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),

    tagTypes: ["Story", "User-Stories", "User-Liked-Stories"],

    endpoints: () => ({})
})