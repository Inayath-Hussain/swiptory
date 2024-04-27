import { AxiosError } from "axios";
import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../instance"
import { ApiError, CanceledError } from "../errors";
import { IStories } from "@src/store/apiSlice/storiesApi";

export const getAllStoriesOfCategoy = (category: string) =>
    new Promise<IStories | CanceledError | ApiError>(async (resolve) => {
        try {
            const result = await axiosInstance.get<IStories>(apiURLs.getAllStoriesOfCategory(category))
            return resolve(result.data);
        }
        catch (ex) {
            if (ex instanceof AxiosError && ex.code === AxiosError.ERR_CANCELED) {
                return resolve(new CanceledError("get all stories of category api cancelled"))
            }

            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })