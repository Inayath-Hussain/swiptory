import { AxiosError, HttpStatusCode } from "axios";

import { apiURLs } from "../apiURLs";
import { axiosInstance } from "../instance";
import { ApiError, CanceledError, UnauthorizedError } from "../errors";
import { createQueryString } from "@src/utilities/createQueryString";


interface Slide {
    heading: string
    description: string
    image: string
    _id: string
}


interface Story {
    _id: string
    category: string
    createdAt: string
    slides: Slide[]
}


export interface GetUserStoriesResult {
    stories: Story[]
}


export const getUserStoriesService = (limit: number | undefined = undefined) =>
    new Promise<GetUserStoriesResult | CanceledError | UnauthorizedError | ApiError>(async resolve => {
        try {
            let queryString = ""

            if (limit !== undefined) queryString = createQueryString({ limit: limit.toString() })

            const url = apiURLs.getUserStories + "?" + queryString

            const result = await axiosInstance.get<GetUserStoriesResult>(url, { withCredentials: true })

            return resolve(result.data);
        }
        catch (ex) {

            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.code === AxiosError.ERR_CANCELED):
                        return resolve(new CanceledError("get user stories api was cancelled"))

                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        return resolve(new UnauthorizedError());
                }
            }


            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })