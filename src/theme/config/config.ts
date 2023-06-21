import { extendTheme } from "@chakra-ui/react";

const theme = {
    initialColorMode: "system",
    useSystemColorMode: false,
};

const config = extendTheme({ theme });

export default config;
