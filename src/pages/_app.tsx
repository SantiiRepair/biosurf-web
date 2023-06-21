import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import { DefaultSeo } from "next-seo";
import theme from "../theme";
import Header from "../modules/components/header";
import config from "../../next-seo.config";
import "../styles/icons.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { COOKIES } from "../auth/cookies";
import ServerCookie from "next-cookies";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    const router = useRouter();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const session = ServerCookie(pageProps)[COOKIES.authToken];
        setHidden(session != undefined && true);
        const handleStart = () => {
            console.log("Starting to load the páge");
        };

        const handleComplete = () => {
            console.log("Páge loaded successfuly");
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router, pageProps]);

    return (
        <>
            <DefaultSeo {...config} />
            <ChakraProvider resetCSS theme={theme}>
                <DAppProvider config={{}}>
                    <GoogleOAuthProvider clientId={process.env.CLIENT_ID!}>
                        <NextNProgress
                            color="#29D"
                            startPosition={0.3}
                            stopDelayMs={200}
                            height={3}
                            options={{ showSpinner: false }}
                        />
                        <Flex direction={"column"}>
                            <Header hidden={hidden} />
                            <Component {...pageProps} />
                        </Flex>
                    </GoogleOAuthProvider>
                </DAppProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
