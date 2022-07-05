import React from "react";
import { NativeBaseProvider, Box, Stack } from "native-base";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Search from "./components/Search";
import Recommendations from "./components/Recommendations";
import UsersShelves from "./components/UsersShelves";
import SearchResults from "./components/SearchResults";
import SingleBook from "./components/SingleBook";
import SingleShelf from "./components/SingleShelf";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";

const MainStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const RecStack = createNativeStackNavigator();
const SearchTabStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack() {
  return (
    <SearchTabStack.Navigator>
      <SearchTabStack.Screen name="Search" component={Search} />
      <SearchTabStack.Screen name="Search Results" component={SearchResults} />
      <SearchTabStack.Screen name="Single Book" component={SingleBook} />
    </SearchTabStack.Navigator>
  );
}

function RecommendationsStack() {
  return (
    <RecStack.Navigator>
      <RecStack.Screen name="Recommendations" component={Recommendations} />
      <RecStack.Screen name="Single Book" component={SingleBook} />
    </RecStack.Navigator>
  );
}

function UsersShelvesStack() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="All Shelves" component={UsersShelves} />
      <UserStack.Screen name="User Profile" component={UserProfile} />
      <UserStack.Screen name="Single Shelf" component={SingleShelf} />
      <UserStack.Screen name="Single Book" component={SingleBook} />
    </UserStack.Navigator>
  );
}

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
        <MainStack.Navigator>
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="Create Account" component={CreateAccount} />
          <MainStack.Screen name="Nav Bar" component={NavBar} />
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
