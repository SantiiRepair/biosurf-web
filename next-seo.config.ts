import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
    titleTemplate: `%s |  NFT`,
    title: `7msuances`,
    description: `7msuances - NFT`,
    canonical: `https://olivefoodsco.com`,
    openGraph: {
        type: `website`,
        locale: `en_US`,
        url: `https://ut5ktg-3000.csb.app/`,
        title: `7msuances - NFT`,
        siteName: `7msuances - NFT`,
        description: `7msuances - NFT`,
        images: [
            {
                url: ``,
                width: 1200,
                height: 630,
                alt: `7msuances - NFT`,
                type: `image/png`,
            },
        ],
    },
    twitter: {
        cardType: `summary_large_image`,
    },
    additionalMetaTags: [
        {
            name: `viewport`,
            content: `width=device-width, initial-scale=1.0`,
        },
    ],
};

export default config;
