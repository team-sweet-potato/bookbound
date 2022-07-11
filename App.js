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
import haveReadShelf from "./components/haveReadShelf";
import toReadShelf from "./components/toReadShelf";
import currentlyReadingShelf from "./components/currentlyReadingShelf";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { Image } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Scanner from './components/Scanner';

const MainStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const RecStack = createNativeStackNavigator();
const SearchTabStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      alt="bookbound logo"
      style={{ width: 81, height: 50 }}
      source={require("./assets/bookboundtestlogo.png")}
    />
  );
}

function SearchStack() {
  return (
    <SearchTabStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchTabStack.Screen name="Search Page" component={Search} />
      <SearchTabStack.Screen name="Scanner" component={Scanner} />
      <SearchTabStack.Screen name="Search Results" component={SearchResults} />
      <SearchTabStack.Screen name="Single Book" component={SingleBook} />
    </SearchTabStack.Navigator>
  );
}

function RecommendationsStack() {
  return (
    <RecStack.Navigator screenOptions={{ headerShown: false }}>
      <RecStack.Screen name="Recommendations" component={Recommendations} />
      <RecStack.Screen name="Single Book" component={SingleBook} />
    </RecStack.Navigator>
  );
}

function UsersShelvesStack() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="All Shelves" component={UsersShelves} />
      <UserStack.Screen name="User Profile" component={UserProfile} />
      <UserStack.Screen name="Read" component={haveReadShelf} />
      <UserStack.Screen name="To Be Read" component={toReadShelf} />
      <UserStack.Screen name="Reading" component={currentlyReadingShelf} />
      <UserStack.Screen name="Single Book" component={SingleBook} />
    </UserStack.Navigator>
  );
}

function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search") {
            return (
              <Ionicons
                name={focused ? "search-sharp" : "search-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "For You") {
            return (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "My Shelves") {
            return (
              <MaterialCommunityIcons
                name={"bookshelf"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="For You"
        component={RecommendationsStack}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="My Shelves"
        component={UsersShelvesStack}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="Create Account" component={CreateAccount} />
          <MainStack.Screen name="Nav Bar" component={NavBar} />
        </MainStack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
