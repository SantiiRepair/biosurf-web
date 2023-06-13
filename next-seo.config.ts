import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
    titleTemplate: `%s |  NFT`,
    title: `Biosurf`,
    description: `Biosurf - NFT`,
    canonical: `https://olivefoodsco.com`,
    openGraph: {
        type: `website`,
        locale: `en_US`,
        url: `https://ut5ktg-3000.csb.app/`,
        title: `Biosurf - NFT`,
        siteName: `Biosurf - NFT`,
        description: `Biosurf - NFT`,
        images: [
            {
                url: ``,
                width: 1200,
                height: 630,
                alt: `Biosurf - NFT`,
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
