import { IStories } from "@src/store/apiSlice/storiesApi"
import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../instance"
import { AxiosError, HttpStatusCode } from "axios"
import { ApiError } from "../errors"


export const getStoryByIdService = (id: string) =>
    new Promise<IStories[string][number] | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<IStories[string][number]>(apiURLs.getStoryById(id))

            resolve(result.data)
        }
        catch (ex) {
            if (ex instanceof AxiosError && ex.response?.status === HttpStatusCode.BadRequest) {
                return resolve(new ApiError(ex.response.data.message || "Story doesn't exis"))
            }

            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })