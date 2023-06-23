/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
    // i18n,
    async redirects() {
        return [
            {
                source: "/login",
                has: [
                    {
                        type: "cookie",
                        key: "smsuances.session",
                    },
                ],
                permanent: false,
                destination: "/dashboard",
            },
            {
                source: "/register",
                has: [
                    {
                        type: "cookie",
                        key: "smsuances.session",
                    },
                ],
                permanent: false,
                destination: "/dashboard",
            },
        ];
    },
    env: {
        BACKEND_URL: "https://ckh9hk-8080.csb.app", // https://api.smsuances.club
        GOOGLE_CLIENT_ID: "639500704609-5gk4cal503o7b2bke21ehullrf6ff6s2",
        FACEBOOK_APP_ID: "571864988449207",
        ACCESS_TOKEN_SECRET:
            "jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",
    },
};

module.exports = nextConfig;
