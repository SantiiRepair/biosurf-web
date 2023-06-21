import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const appearence: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: false,
};

const config = extendTheme({ appearence });

export default config;
