import { AxiosError, HttpStatusCode } from "axios";

import { apiURLs } from "../apiURLs";
import { ApiError, CanceledError, UnauthorizedError } from "../errors";
import { axiosInstance } from "../instance";


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
    likes: number
}


export interface GetUserStoriesResult {
    stories: Story[]
}


export const getUserStoriesService = () =>
    new Promise<GetUserStoriesResult | CanceledError | UnauthorizedError | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<GetUserStoriesResult>(apiURLs.getUserStories, { withCredentials: true })

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