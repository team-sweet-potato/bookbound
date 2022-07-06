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
import { Image } from "native-base";

const MainStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const RecStack = createNativeStackNavigator();
const SearchTabStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 81, height: 50 }}
      source={require("./assets/bookboundtestlogo.png")}
    />
  );
}

function SearchStack() {
  return (
    <SearchTabStack.Navigator>
      <SearchTabStack.Screen name="Search" component={Search} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <SearchTabStack.Screen name="Search Results" component={SearchResults} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <SearchTabStack.Screen name="Single Book" component={SingleBook} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
    </SearchTabStack.Navigator>
  );
}

function RecommendationsStack() {
  return (
    <RecStack.Navigator>
      <RecStack.Screen name="Recommendations" component={Recommendations} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <RecStack.Screen name="Single Book" component={SingleBook} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
    </RecStack.Navigator>
  );
}

function UsersShelvesStack() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="All Shelves" component={UsersShelves} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <UserStack.Screen name="User Profile" component={UserProfile} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <UserStack.Screen name="Single Shelf" component={SingleShelf} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <UserStack.Screen name="Single Book" component={SingleBook} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
    </UserStack.Navigator>
  );
}

function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <Tab.Screen name="For You" component={RecommendationsStack} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
      <Tab.Screen name="My Shelves" component={UsersShelvesStack} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Login" component={Login}  />
          <MainStack.Screen name="Create Account" component={CreateAccount} />
          <MainStack.Screen name="Nav Bar" component={NavBar} />
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
