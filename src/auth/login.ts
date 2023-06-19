import Cookie from "js-cookie";
import Router from "next/router";
import { catchAxiosError } from "./error";
import { post } from "./rest";
import { LoginInputs } from "../types/pages";

export const COOKIES = {
    authToken: "smsuances.session",
};

export async function Login(inputs: LoginInputs): Promise<string | void> {
    const data = new URLSearchParams(inputs);
    const res: any = await post("/user/login", data).catch(catchAxiosError);
    if (res.error) {
        return res.error;
    } else if (!res.data || !res.data.token) {
        return "Something went wrong!";
    }
    const { session } = res.data;

    Cookie.set(COOKIES.authToken,session);
    await Router.push("/dashboard");
}
