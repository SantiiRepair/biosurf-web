import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

import config from "./config/config";
import fonts from "./config/fonts";
import colors from "./config/colors";
import shadows from "./config/shadows";

import Button from "./components/button";

const customTheme = {
  styles,
  fonts,
  config,
  colors,
  shadows,
  components: {
    Button,
  },
};

export default extendTheme(customTheme);
