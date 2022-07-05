import React from "react";
import { NativeBaseProvider, Box, Stack } from "native-base";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigatiion/bottom-tabs";
import Home from "./components/Home";
import Search from "./components/Search";
import Recommendations from "./components/Recommendations";
import UsersShelves from "./components/UsersShelves";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="For You" component={Recommendations} />
      <Tab.Screen name="My Shelves" component={UsersShelves} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator></Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
