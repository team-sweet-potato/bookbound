import React, { useEffect, useState } from "react";
import {
  Avatar,
  ScrollView,
  Container,
  VStack,
  Text,
  HStack,
  Box,
  Flex,
  Image,
  Center,
  Button,
  Stack,
  View,
  Divider,
  NativeBaseProvider,
} from "native-base";
import { SafeAreaView, ImageBackground } from "react-native";
import theme from "./Theme";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const UsersShelves = ({ navigation }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    navigation.navigate("Login");
  };

  useEffect(() => {
    getUser();
  }, []);


  return Object.keys(user).length === 0 ? (
    <Text>Loading...</Text>
  ) : (
    <NativeBaseProvider>
      <SafeAreaView>
        <Center>
          <HStack>
            <Image
              mt="3"
              source={require("../assets/avatarbb.png")}
              alt="books"
              style={theme.avatar}
            ></Image>
            <Box mb="2.5" mt="4" w="40" padding="3">
              <Button
                flexDirection={"row-reverse"}
                size="sm"
                colorScheme="rose"
                variant="outline"
                onPress={() => navigation.navigate("User Profile", { user })}
              >
                <Text fontSize="12" color={theme.rosey[800]}>
                  Edit Account
                </Text>
              </Button>
              <Button
                backgroundColor="#ddbea9"
                flexDirection="row-reverse"
                size="sm"
                variant="outline"
                colorScheme="rose"
                onPress={handleSignOut}
              >
                <Text fontSize="12" color={theme.rosey[800]}>
                  Logout
                </Text>
              </Button>
            </Box>
          </HStack>
        </Center>
        <View>
          <Box marginLeft={10} mb="2" space={1} w="100%" px="3">
            <Text fontSize="lg" fontWeight="medium">
              {`${user.firstName ? user.firstName : ""} ${
                user.lastName ? user.lastName : ""
              }`}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {`@${user.username}`}
            </Text>
          </Box>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <Divider />
        <Box mt="4">
          <Center>
            <Image
              source={require("../assets/myshelveslogo.png")}
              alt="my shelves"
              style={theme.myshelves}
              mb="7"
              mt="5"
            ></Image>
          </Center>
        </Box>
        <Flex>
          <HStack justifyContent="space-evenly" mb="2" mt="1.5">
            <Button
              h="40"
              w="20"
              bg="#cb997e"
              rounded="md"
              shadow={3}
              onPress={() => navigation.navigate("To Be Read")}
            >
              <Center>To Be Read</Center>
            </Button>
            <Button
              h="40"
              w="20"
              bg="#b7b7a4"
              rounded="md"
              shadow={3}
              onPress={() => navigation.navigate("Reading")}
            >
              <Center>Reading</Center>
            </Button>
            <Button
              h="40"
              w="20"
              bg="#6b705c"
              rounded="md"
              shadow={3}
              onPress={() => navigation.navigate("Read")}
            >
              <Center>Read</Center>
            </Button>
          </HStack>
        </Flex>
      </SafeAreaView>
      <ImageBackground
        source={require("../assets/stacksforshelves.png")}
        alt="books"
        style={theme.singleStacks}
      ></ImageBackground>
    </NativeBaseProvider>
  );
};

export default UsersShelves;
