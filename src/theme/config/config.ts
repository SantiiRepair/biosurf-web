import { extendTheme } from "@chakra-ui/react";

const theme = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const config = extendTheme({ theme });

export default config;
