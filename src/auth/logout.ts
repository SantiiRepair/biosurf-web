import Cookie from "js-cookie";
import Router from "next/router";
import { COOKIES } from "./cookies";

export const logout = async () => {
    Cookie.remove(COOKIES.authToken);
    await Router.push("/login");
};
