import React from "react";
import theme from "./Theme.js";
import { Image } from "native-base";

const HeaderLogo = ({}) => {
  return (
    <Image
      alt="bookbound logo"
      style={theme.smallLogo}
      source={require("../assets/logo.png")}
    />
  );
};

export default HeaderLogo;
