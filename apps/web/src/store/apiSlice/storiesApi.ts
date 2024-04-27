import { AxiosError, HttpStatusCode } from "axios";

import { apiURLs } from "@src/services/apiURLs";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";
import { baseApiSlice } from "./baseApiSlice";



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


interface IPostStoryPayload {
    category: string
    slides: {
        heading: string
        description: string
        image: string
    }[]
}



const storiesApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getStories: builder.query<IStories, string>({
            query: (queryString: string) => ({ url: `${apiURLs.getAllStories}?${queryString}` }),
            providesTags: ["Story"]
        }),


        postStory: builder.mutation({
            query: (data: IPostStoryPayload) => ({ url: apiURLs.postStory, data, credentials: "include", method: "POST" }),

            // invalidate tags only when request is successful
            invalidatesTags: (result, error) => error ? [] : ["Story", "User-Stories"],

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


export const { useGetStoriesQuery, usePostStoryMutation } = storiesApi;