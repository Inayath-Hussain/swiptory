import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { env } from "@src/env";
import { apiURLs } from "@src/services/apiURLs";



interface ISlide {
    heading: string
    description: string
    image: string
    _id: string
}


export interface IStories {
    [k: string]: {
        _id: string
        slides: ISlide[]
        category: string
        createdAt: string
    }[]
}




export const storiesApi = createApi({
    reducerPath: "storiesApi",
    baseQuery: fetchBaseQuery({ baseUrl: env.VITE_SERVER_API_BASE_URL }),

    endpoints: (builder) => ({
        getStories: builder.query<IStories, string>({
            query: (queryString: string) => ({ url: `${apiURLs.getAllStories}?${queryString}` })
        })
    })
})



export const { useGetStoriesQuery } = storiesApi;