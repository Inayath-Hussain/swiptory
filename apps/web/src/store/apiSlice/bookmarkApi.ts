import { AxiosError, HttpStatusCode } from "axios";

import { apiURLs } from "@src/services/apiURLs";
import { baseApiSlice } from "./baseApiSlice";
import { ApiError, CanceledError, UnauthorizedError } from "@src/services/errors";


interface IAddOrRemoveBookmarkBody {
    story_id: string
}


const bookmarkApi = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserBookmarks: builder.query<string[], void>({
            query: () => ({ url: apiURLs.getBookmarks, method: "GET" }),
            providesTags: ["User-Bookmarks"]
        }),


        addBookmark: builder.mutation({
            query: (payload: IAddOrRemoveBookmarkBody) => ({ url: apiURLs.addBookmark, data: payload, method: "PUT" }),
            invalidatesTags: (result, error) => error ? [] : ["User-Bookmarks"],


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




        removeBookmark: builder.mutation({
            query: (payload: IAddOrRemoveBookmarkBody) => ({ url: apiURLs.removeBookmark, data: payload, method: "PUT" }),
            invalidatesTags: (result, error) => error ? [] : ["User-Bookmarks"],

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




export const { useGetUserBookmarksQuery, useAddBookmarkMutation, useRemoveBookmarkMutation } = bookmarkApi; 