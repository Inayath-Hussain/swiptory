import { IStories } from "@src/store/apiSlice/storiesApi"
import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../instance"
import { AxiosError, HttpStatusCode } from "axios"
import { ApiError, UnauthorizedError } from "../errors"


export const getBookmarkStoriesService = () =>
    new Promise<IStories[string] | UnauthorizedError | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<IStories[string]>(apiURLs.getBookmarkStories, { withCredentials: true })

            resolve(result.data)
        }
        catch (ex) {
            if (ex instanceof AxiosError && ex.response?.status === HttpStatusCode.Unauthorized) {
                return resolve(new UnauthorizedError());
            }

            resolve(new ApiError("Please try again later"))
        }
    })