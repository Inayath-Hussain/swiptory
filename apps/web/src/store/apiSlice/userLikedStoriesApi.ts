import { AxiosError, HttpStatusCode } from "axios";

import { baseApiSlice } from "./baseApiSlice";
import { apiURLs } from "@src/services/apiURLs";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";


interface LikeOrUnlikeBody {
    story_id: string
}


const userLikedStoriesApi = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserLikedStories: builder.query<string[], void>({
            query: () => ({ url: apiURLs.getUserLikedStories, method: "GET" }),
            providesTags: ["User-Liked-Stories"]
        }),


        likeStory: builder.mutation({
            query: (payload: LikeOrUnlikeBody) => ({ url: apiURLs.likeStory, data: payload, method: "PUT" }),
            invalidatesTags: ["User-Liked-Stories"],

            transformErrorResponse(baseQueryReturnValue: AxiosError<any, any> | string, meta, arg): ApiError | CanceledError | UnauthorizedError {
                if (baseQueryReturnValue instanceof AxiosError) {
                    switch (true) {
                        case (baseQueryReturnValue.code === AxiosError.ERR_CANCELED):
                            return new CanceledError("post story was cancelled");

                        case (baseQueryReturnValue.response?.status === HttpStatusCode.UnprocessableEntity):
                            return new ApiError(baseQueryReturnValue.response.data.message);

                        case (baseQueryReturnValue.response?.status === HttpStatusCode.Unauthorized):
                            return new UnauthorizedError();
                    }
                }

                return new ApiError("Please try again later");
            }
        }),



        unlikeStory: builder.mutation({
            query: (payload: LikeOrUnlikeBody) => ({ url: apiURLs.unlikeStory, data: payload, method: "PUT" }),
            invalidatesTags: ["User-Liked-Stories"],

            transformErrorResponse(baseQueryReturnValue: AxiosError<any, any> | string, meta, arg): ApiError | CanceledError | UnauthorizedError {
                if (baseQueryReturnValue instanceof AxiosError) {
                    switch (true) {
                        case (baseQueryReturnValue.code === AxiosError.ERR_CANCELED):
                            return new CanceledError("post story was cancelled");

                        case (baseQueryReturnValue.response?.status === HttpStatusCode.UnprocessableEntity):
                            return new ApiError(baseQueryReturnValue.response.data.message);

                        case (baseQueryReturnValue.response?.status === HttpStatusCode.Unauthorized):
                            return new UnauthorizedError();
                    }
                }

                return new ApiError("Please try again later");
            }
        })
    })
})



/**
 * store's empty array in redux for getUserLikedStories endpoint
 */
export const resetUserLikedStoriesApi = () => userLikedStoriesApi.util.updateQueryData("getUserLikedStories", undefined, (data) => {
    return [];
})


export const { useGetUserLikedStoriesQuery, useLikeStoryMutation, useUnlikeStoryMutation } = userLikedStoriesApi;