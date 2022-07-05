import React from "react";
import { NativeBaseProvider, Box, Stack } from "native-base";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigatiion/bottom-tabs";
import Home from "./components/Home";
import Search from "./components/Search";
import Recommendations from "./components/Recommendations";
import UsersShelves from "./components/UsersShelves";
import SearchResults from "./components/SearchResults";
import SingleBook from "./components/SingleBook";
import SingleShelf from "./components/SingleShelf";
import UserProfile from "./components/UserProfile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="For You" component={RecommendationsStack} />
      <Tab.Screen name="My Shelves" component={UsersShelvesStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Create Account" component={CreateAccount} />
          <Stack.Screen name="Nav Bar" component={NavBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Search Results" component={SearchResults} />
      <Stack.Screen name="Single Book" component={SingleBook} />
    </Stack.Navigator>
  );
}

function RecommendationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recommendations" component={Recommendations} />
      <Stack.Screen name="Single Book" component={SingleBook} />
    </Stack.Navigator>
  );
}

function UsersShelvesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Shelves" component={UsersShelves} />
      <Stack.Screen name="User Profile" component={UserProfile} />
      <Stack.Screen name="Single Shelf" component={SingleShelf} />
      <Stack.Screen name="Single Book" component={SingleBook} />
    </Stack.Navigator>
  );
}
