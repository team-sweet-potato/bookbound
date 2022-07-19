import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Box,
  Flex,
  Image,
  Center,
  Button,
  View,
  Divider,
  NativeBaseProvider,
} from "native-base";
import { SafeAreaView } from "react-native";
import theme from "./Theme";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import LoadingAnimation from "./Loading";

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
    <LoadingAnimation />
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
            <Box mb="2.5" mt="3" w="40" padding="3">
              <Button
                flexDirection={"row-reverse"}
                size="sm"
                colorScheme="rose"
                variant="outline"
                borderColor={theme.browns[500]}
                borderRadius={"100"}
                mb={"2"}
                onPress={() => navigation.navigate("User Profile", { user })}
              >
                <Text fontSize="12" color={theme.browns[500]}>
                  Edit Account
                </Text>
              </Button>
              <Button
                flexDirection="row-reverse"
                colorScheme="rose"
                size="sm"
                variant="outline"
                borderRadius={"100"}
                borderColor={theme.rosey[800]}
                onPress={handleSignOut}
                backgroundColor={theme.browns[100]}
              >
                <Text fontSize="12" color={theme.rosey[800]}>
                  Logout
                </Text>
              </Button>
            </Box>
          </HStack>
        </Center>
        <View>
          <Box marginLeft={10} mb="7" space={1} w="100%" px="3">
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
        <Box mt="7">
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
          <HStack justifyContent="center" mb="2" mt="7">
            <Button
              marginRight={"4"}
              variant={"ghost"}
              colorScheme={theme.browns}
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
              marginRight={"4"}
              variant={"ghost"}
              colorScheme={theme.browns}
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
              variant={"ghost"}
              colorScheme={theme.browns}
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
      <Box>
        <Center>
          <Image
            source={require("../assets/shelf.png")}
            alt="books"
            style={theme.shelfImage}
          ></Image>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default UsersShelves;
