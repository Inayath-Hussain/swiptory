import { AxiosError, HttpStatusCode } from "axios";
import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../instance"
import { ApiError, CanceledError, UnauthorizedError } from "../errors";


interface Iresult {
    profilePicUrl: string
    username: string
}

export const getUserProfileService = () =>
    new Promise<Iresult | CanceledError | UnauthorizedError | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<Iresult>(apiURLs.profile, { withCredentials: true })

            resolve(result.data);
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.code === AxiosError.ERR_CANCELED):
                        return resolve(new CanceledError("get user profile api was cancelled"));


                    case (ex.response?.status === HttpStatusCode.Unauthorized):
                        return resolve(new UnauthorizedError());

                }
            }

            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }

    })