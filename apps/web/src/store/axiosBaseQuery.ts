import { BaseQueryFn, } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

import { axiosInstance } from "@src/services/instance";


type returnData = { data: any } | { error: AxiosError | string }


export const axiosBaseQuery = (): BaseQueryFn<{
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
}> => async ({ url, data, headers, method, params }): Promise<returnData> => {

    try {
        const result = await axiosInstance({ url, method, params, headers, data, withCredentials: true })
        return { data: result.data }
    }
    catch (ex) {
        if (ex instanceof AxiosError) return { error: ex }

        console.log(ex)
        return { error: "Please try again later" }
    }
}