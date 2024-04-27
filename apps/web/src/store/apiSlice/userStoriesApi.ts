import { baseApiSlice } from "./baseApiSlice";

import { apiURLs } from "@src/services/apiURLs";
import { GetUserStoriesResult } from "@src/services/user/stories";
import { createQueryString } from "@src/utilities/createQueryString";


export const defaultUserStoriesQueryOptions = {
    limit: "4"
}


export const defaultUserStoriesQueryString = createQueryString(defaultUserStoriesQueryOptions)

const userStoriesApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserStories: builder.query<GetUserStoriesResult["stories"], string>({

            query: (queryString) => ({ url: apiURLs.getUserStories + "?" + queryString, method: "GET" }),
            providesTags: ["User-Stories"],

            transformResponse(baseQueryReturnValue: GetUserStoriesResult, meta, arg) {
                return baseQueryReturnValue.stories;
            },
        })
    })
});



/**
 * set's data of a cache entry to an empty array. cache key is the query string
 */
export const resetUserStoriesApiSlice = (queryString: string) => userStoriesApiSlice.util.updateQueryData("getUserStories", queryString, (data) => {
    return []
})


export const { useGetUserStoriesQuery } = userStoriesApiSlice;