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
  Center,
  Button,
  Stack,
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
        <Flex direction="row-reverse" padding="3">
          <Stack mb="2.5" mt="5">
            <Button
              size="sm"
              variant="outline"
              colorScheme="secondary"
              onPress={handleSignOut}
            >
              Log Out
            </Button>
          </Stack>
        </Flex>
        {/* <Flex direction="row" mb="2" mt="1.5">
        <Box safeAreaTop>
          <VStack space={2.5} w="100%" px="3">
            <Avatar
              size="lg"
              source={{
                uri: "https://media.istockphoto.com/photos/man-sitting-on-sofa-reading-a-book-picture-id457207689?k=20&m=457207689&s=612x612&w=0&h=UNc95C-PqL_bXVz20Xq_c5RlIRen2RCc1avDlQKs-VA=",
              }}
            ></Avatar>
          </VStack>
        </Box>
      </Flex> */}
        <Container>
          <Box space={4} w="100%" px="3" padding="3">
            <Text fontSize="lg" fontWeight="medium">
              {`${user.firstName ? user.firstName : ""} ${
                user.lastName ? user.lastName : ""
              }`}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {`@${user.username}`}
            </Text>
          </Box>
        </Container>
        <Box mb="2.5" mt="5" w="40" padding="3">
          <Button
            size="sm"
            colorScheme="secondary"
            onPress={() => navigation.navigate("User Profile", { user })}
          >
            Edit Account
          </Button>
        </Box>
        <Divider my="2" />
        <Center>
          <Text fontSize="lg" fontWeight="medium" padding="3">
            My Stacks
          </Text>
        </Center>
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
        source={require("../assets/bookstack.png")}
        alt="books"
        style={theme.bookStack}
      ></ImageBackground>
    </NativeBaseProvider>
  );
};

export default UsersShelves;
