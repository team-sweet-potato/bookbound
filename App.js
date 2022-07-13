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
import ReadShelf from "./components/ReadShelf";
import ToReadShelf from "./components/ToReadShelf";
import ReadingShelf from "./components/ReadingShelf";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { Image } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Scanner from "./components/Scanner";
import { auth } from "./firebase";

const MainStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const RecStack = createNativeStackNavigator();
const SearchTabStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      alt="bookbound logo"
      style={{ width: 65, height: 40 }}
      source={require("./assets/bookboundtestlogo.png")}
    />
  );
}

function HomePageStack() {
  return (
    <HomeStack.Navigator initialRouteName="Homepage">
      <HomeStack.Screen
        name="Homepage"
        component={Home}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </HomeStack.Navigator>
  );
}

function SearchStack() {
  return (
    <SearchTabStack.Navigator initialRouteName="Search Page">
      <SearchTabStack.Screen
        name="Search Page"
        component={Search}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <SearchTabStack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <SearchTabStack.Screen
        name="Search Results"
        component={SearchResults}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <SearchTabStack.Screen
        name="Single Book"
        component={SingleBook}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
    </SearchTabStack.Navigator>
  );
}

function RecommendationsStack() {
  return (
    <RecStack.Navigator initialRouteName="Recommendations">
      <RecStack.Screen
        name="Recommendations"
        component={Recommendations}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <RecStack.Screen
        name="Single Book"
        component={SingleBook}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
    </RecStack.Navigator>
  );
}

function UsersShelvesStack() {
  return (
    <UserStack.Navigator initialRouteName="All Shelves">
      <UserStack.Screen
        name="All Shelves"
        component={UsersShelves}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <UserStack.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <UserStack.Screen
        name="Read"
        component={ReadShelf}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <UserStack.Screen
        name="To Be Read"
        component={ToReadShelf}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <UserStack.Screen
        name="Reading"
        component={ReadingShelf}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
      <UserStack.Screen
        name="Single Book"
        component={SingleBook}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerBackTitleVisible: false,
        }}
      />
    </UserStack.Navigator>
  );
}

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
      <Tab.Screen name="Home" component={HomePageStack} />
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
        {auth ? (
          <MainStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="Login" component={Login} />
            <MainStack.Screen name="Create Account" component={CreateAccount} />
            <MainStack.Screen name="Nav Bar" component={NavBar} />
          </MainStack.Navigator>
        ) : (
          <MainStack.Navigator
            initialRouteName="Nav Bar"
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="Nav Bar" component={NavBar} />
          </MainStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
