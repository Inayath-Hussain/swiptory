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




/**
 * replaces the present user stories with provided stories
 * @param queryString key used to get user stories
 * @param payload array of stories
 * @returns 
 */
export const replaceUserStories = (queryString: string, payload: GetUserStoriesResult["stories"]) =>
    userStoriesApiSlice.util.updateQueryData("getUserStories", queryString, (data) => {
        return payload;
    })




/**
 * update like of story posted by user
 * @param queryString key used to get user stories
 * @param story_id id of interacted story
 * @param type "increase" when user liked the story, "decrease" when user unliked the story
 */
export const updateUserStoriesLike = (queryString: string, story_id: string, type: "increase" | "decrease") =>
    userStoriesApiSlice.util.updateQueryData("getUserStories", queryString, (data) => {
        const index = data.findIndex(d => d._id === story_id)

        if (index === -1) return data;
        data[index].likes = type === "increase" ? data[index].likes + 1 : data[index].likes - 1;

        return data;
    })



export const { useGetUserStoriesQuery } = userStoriesApiSlice;