import axios, { AxiosRequestConfig } from "axios";
import { catchAxiosError } from "./error";

const baseConfig: AxiosRequestConfig = {
    baseURL: process.env.BACKEND_URL,
};

export const post = async (url: string, data: URLSearchParams) => {
    try {
        return await axios.post(url, data, baseConfig);
    } catch (err) {
        return catchAxiosError(err as any);
    }
};

export const get = async (url: string, config: AxiosRequestConfig = {}) => {
    const axiosConfig = {
        ...baseConfig,
        ...config,
    };
    return await axios.get(url, axiosConfig).catch(catchAxiosError);
};
