import { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useState } from 'react';
import theme from '../theme';
import Header from '../modules/components/header';
import config from '../../next-seo.config';
import '../styles/icons.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <SessionProvider session={session}>
                <DefaultSeo {...config} />
                <ChakraProvider resetCSS theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <DAppProvider config={{}}>
                            <Flex direction={'column'}>
                                <Header />
                                <Component {...pageProps} />
                            </Flex>
                        </DAppProvider>
                    </QueryClientProvider>
                </ChakraProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
