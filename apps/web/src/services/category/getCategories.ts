import { AxiosError } from "axios";
import { apiURLs } from "../apiURLs";
import { ApiError, CanceledError } from "../errors";
import { axiosInstance } from "../instance";



export interface ICategories {
    categories: {
        name: string
        image: string
    }[]
}

export const getCategoriesService = () =>
    new Promise<ICategories | ApiError | CanceledError>(async (resolve) => {
        try {
            const result = await axiosInstance.get<ICategories>(apiURLs.getCategory);
            return resolve(result.data);
        }
        catch (ex) {
            if (ex instanceof AxiosError && ex.code === AxiosError.ERR_CANCELED) {
                return resolve(new CanceledError("get categories api was cancelled"));
            }


            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })