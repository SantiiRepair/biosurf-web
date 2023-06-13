import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/img/logo.svg" />
                    <meta name="description" content="Biosurf NFT" />
                </Head>
                <body>
                    {/* Make Color mode to persists when you refresh the page. */}
                    <ColorModeScript initialColorMode={'dark'} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
