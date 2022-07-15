import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
import { Center, Image, NativeBaseProvider, Footer } from "native-base";

const HeaderLogo = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center>
        <Image
          alt="bookbound logo"
          style={theme.smallLogo}
          source={require("../assets/logo.png")}
        />
      </Center>
    </NativeBaseProvider>
  );
};

export default HeaderLogo;
