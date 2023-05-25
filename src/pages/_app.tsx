import Head from "next/head";
import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Config, DAppProvider, Mainnet } from "@usedapp/core";
import { MetaMaskInpageProvider } from "@metamask/providers";
import theme from "../theme";
import Header from "../modules/components/header";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const config: Config = {
    readOnlyChainId: 1,
    readOnlyUrls: {
      [Mainnet.chainId]: process.env.MAINNET_RPC! || process.env.SEPOLIA_RPC!,
    },
    autoConnect: false,
  };

  return (  
    <ChakraProvider resetCSS theme={theme}>
      <DAppProvider config={config}>
        <Head>
          <title>Biosurf NFT</title>
          <link rel="shortcut icon" href="/img/logo.svg" />
          <link rel="apple-touch-icon" href="/img/logo.svg" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="CAI NFT" />
        </Head>

        <Flex direction={"column"}>
          <Header />
          <Component {...pageProps} />
        </Flex>
      </DAppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
