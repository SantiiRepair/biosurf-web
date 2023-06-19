import { AxiosError } from "axios";

export type ErrorResponse = {
    error: string;
};

export function catchAxiosError(err: AxiosError): ErrorResponse {
    console.log("Error", err.message);
    let message =
        "Something happened in setting up the request that triggered an Error";
    if (err.response) {
        message = (err as any).response.data.message;
    } else if (err.request) {
        message = "The request was made, but no response was received";
    }
    return { error: message };
}
