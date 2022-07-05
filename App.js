import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Box>Hello world</Box>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
