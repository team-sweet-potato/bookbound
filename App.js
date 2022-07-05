import React from 'react';
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Box, Stack } from 'native-base';
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { Login } from './components/Login';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
