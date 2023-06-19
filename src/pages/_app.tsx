import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import { DefaultSeo } from "next-seo";
import theme from "../theme";
import Header from "../modules/components/header";
import config from "../../next-seo.config";
import "../styles/icons.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    return (
        <>
            <DefaultSeo {...config} />
            <ChakraProvider resetCSS theme={theme}>
                <DAppProvider config={{}}>
                    <GoogleOAuthProvider clientId={process.env.CLIENT_ID!}>
                        <Flex direction={"column"}>
                            <Header />
                            <Component {...pageProps} />
                        </Flex>
                    </GoogleOAuthProvider>
                    ;
                </DAppProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
