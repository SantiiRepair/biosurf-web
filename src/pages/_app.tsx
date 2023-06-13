import { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import { DefaultSeo } from 'next-seo';
import theme from '../theme';
import Header from '../modules/components/header';
import config from '../../next-seo.config';
import '../styles/icons.scss';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    return (
        <>
            <DefaultSeo {...config} />
            <ChakraProvider resetCSS theme={theme}>
                <DAppProvider config={{}}>
                    <Flex direction={'column'}>
                        <Header />
                        <Component {...pageProps} />
                    </Flex>
                </DAppProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
