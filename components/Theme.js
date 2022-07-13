import React from "react";
import { extendTheme } from "native-base";

const customTheme = extendTheme({
  colors: {
    rosey: {
      50: "#ea8c55",
      100: "#c75146",
      200: "#CE7366",
      300: "#B36A5E",
      400: "#ad2e24",
      500: "#cc444b",
      600: "#D35669",
      700: "#bf4342",
      800: "#81171b",
      900: "#540804",
    },
    amber: {
      50: "#ffc971",
      100: "#ffb627",
      200: "#ff9505",
      300: "#e2711d",
      400: "#cc5803",
    },
    deepRed: {
      50: "#ea8c55",
      100: "#c75146",
      200: "#ad2e24",
      300: "#81171b",
      400: "#540804",
    },
    browns: {
      50: "#ede0d4",
      100: "#e6ccb2",
      200: "#ddb892",
      300: "#b08968",
      400: "#7f5539",
      500: "#9c6644",
    },
    alert: {
      main: "#9a031e",
    },
  },
  smallLogo: {
    width: 130,
    height: 20,
  },
  loginLogo: {
    width: 150,
    height: 29,
  },
  arch: {
    width: 40,
    height: 80,
    flex: "center",
  },
  button: {
    size: "md",
    variant: "ghost",
  },
  buttonText: {
    color: "#B36A5E",
  },
  typography: {
    100: {
      normal: "Roboto-Light",
      italic: "Roboto-LightItalic",
    },
    200: {
      normal: "Roboto-Light",
      italic: "Roboto-LightItalic",
    },
    300: {
      normal: "Roboto-Light",
      italic: "Roboto-LightItalic",
    },
    400: {
      normal: "Roboto-Regular",
      italic: "Roboto-Italic",
    },
    500: {
      normal: "Roboto-Medium",
    },
    600: {
      normal: "Roboto-Medium",
      italic: "Roboto-MediumItalic",
    },
    letterSpacings: {
      xs: "-0.05em",
      sm: "-0.025em",
      md: 0,
      lg: "0.025em",
      xl: "0.05em",
      "2xl": "0.1em",
    },
    lineHeights: {
      "2xs": "1em",
      xs: "1.125em",
      sm: "1.25em",
      md: "1.375em",
      lg: "1.5em",
      xl: "1.75em",
      "2xl": "2em",
      "3xl": "2.5em",
      "4xl": "3em",
      "5xl": "4em",
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
      extrablack: 950,
    },
    fonts: {
      heading: undefined,
      body: undefined,
      mono: undefined,
    },
    fontSizes: {
      "2xs": 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
      "5xl": 48,
      "6xl": 60,
      "7xl": 72,
      "8xl": 96,
      "9xl": 128,
    },
    opacity: {
      0: 0,
      5: 0.05,
      10: 0.1,
      20: 0.2,
      25: 0.25,
      30: 0.3,
      40: 0.4,
      50: 0.5,
      60: 0.6,
      70: 0.7,
      75: 0.75,
      80: 0.8,
      90: 0.9,
      95: 0.95,
      100: 1,
    },
  },
});

const theme = extendTheme({
  color: customTheme.colors,
  smallLogo: customTheme.smallLogo,
  loginLogo: customTheme.loginLogo,
  typography: customTheme.typography,
  opacity: customTheme.opacity,
  button: customTheme.button,
  buttonText: customTheme.buttonText,
});

export default theme;
