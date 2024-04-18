import { AxiosError, CanceledError, GenericAbortSignal, HttpStatusCode } from "axios";

import { apiURLs } from "../apiURLs";
import { axiosInstance } from "../instance";
import { ApiError } from "../errors";


interface Iprops {
    payload: {
        username: string;
        password: string;
    }
    signal: GenericAbortSignal
}


export const loginService = async ({ payload, signal }: Iprops) =>
    new Promise(async (resolve) => {
        try {
            const result = await axiosInstance.post(apiURLs.login, payload, { withCredentials: true, signal })

            return resolve(result.data);
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                switch (true) {
                    case (ex.response?.status === HttpStatusCode.UnprocessableEntity):
                        return resolve(new ApiError(ex.response.data.message));

                    case (ex.response?.status === HttpStatusCode.BadRequest):
                        return resolve(new ApiError(ex.response.data.message));

                    case (ex.code === AxiosError.ERR_CANCELED):
                        return resolve(new CanceledError());
                }
            }

            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    });