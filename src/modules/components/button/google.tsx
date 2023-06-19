import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Cookie from "js-cookie";
import Router from "next/router";
import axios from "axios";
import { catchAxiosError } from "@/src/auth/error";
import { useGoogleLogin } from "@react-oauth/google";
import jose, { JWTPayload } from "jose";

interface GoogleProps {
    text: string;
    action: string;
}

export const COOKIES = {
    authToken: "smsuances.session",
};

let t: JWTPayload = {
    sub: "115623476776723449762",
    name: "Santiago Ramirez",
    given_name: "Santiago",
    family_name: "Ramirez",
    picture:
        "https://lh3.googleusercontent.com/a/AAcHTtdYqAIiJ7HNxRKw0VU-T65QEQSJUkz8Z11vvvWENg\u003ds96-c",
    email: "miguelsantiago1940@gmail.com",
    email_verified: true,
    locale: "es",
};

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

            const token = await new jose.SignJWT(t)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(secret);

            const res: any = await axios
                .post(`${process.env.BACKEND_URL}/user/google`, {
                    googleToken: token,
                    action: action,
                })
                .catch(catchAxiosError);

            if (res.error) {
                return res.error;
            } else if (!res.data || !res.data.token) {
                return "Something went wrong!";
            }

            if (action == "login") {
                const { token } = res.data;
                Cookie.set(COOKIES.authToken, token);
                await Router.push("/dashboard");
            } else if (action == "register") {
                await Router.push("/login");
            }
        },
    });
    return (
        <Center p={0}>
            <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={() => {
                    auth();
                }}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
