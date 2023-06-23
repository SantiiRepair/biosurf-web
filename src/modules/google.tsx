import { FcGoogle } from "react-icons/fc";
import Cookie from "js-cookie";
import Router from "next/router";
import axios from "axios";
import { catchAxiosError } from "@/src/auth/error";
import { useGoogleLogin } from "@react-oauth/google";
import * as jose from "jose";
import { COOKIES } from "@/src/auth/cookies";
import { Button } from "../components/ui/button";

interface GoogleProps {
    text: string;
    action: string;
}

export default function GoogleButton({ text, action }: GoogleProps) {
    const auth = useGoogleLogin({
        onSuccess: async googleToken => {
            let secret = new TextEncoder().encode(
                process.env.ACCESS_TOKEN_SECRET!,
            );

            const userInfo: any = await new Promise(resolve => {
                const xhr = new XMLHttpRequest();
                xhr.open(
                    "GET",
                    `https://www.googleapis.com/oauth2/v3/userinfo`,
                );
                xhr.setRequestHeader(
                    "Authorization",
                    `Bearer ${googleToken.access_token}`,
                );
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300)
                        resolve(JSON.parse(this.responseText));
                    else resolve({ err: "404" });
                };
                xhr.send();
            });

            let obj: jose.JWTPayload = userInfo;
            const token = await new jose.SignJWT(obj)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(secret);

            await axios
                .post(`${process.env.BACKEND_URL}/user/google`, {
                    googleToken: token,
                    action: action,
                })
                .catch(catchAxiosError)
                .then(async (res: any) => {
                    if (res.error) {
                        return res.error;
                    } else if (res.status == 200 && action == "register") {
                        await Router.push("/login");
                    } else if (!res.data || !res.data.session) {
                        return "Something went wrong!";
                    } else if (res.status == 200 && action == "login") {
                        const { session } = res.data;
                        Cookie.set(COOKIES.authToken, session);
                        await Router.push("/dashboard");
                    }
                });
        },
    });

    return (
        <Button
            variant={"outline"}
            onClick={() => {
                auth();
            }}
        >
            <FcGoogle />
            <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        </Button>
    );
}
