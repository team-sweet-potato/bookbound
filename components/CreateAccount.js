import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
  NativeBaseProvider,
  Footer,
} from "native-base";
import { Animated, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreateAccount = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  async function handleSignUp() {
    if (password === verifyPassword && firstName && lastName && username) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: firstName,
          lastName: lastName,
          username: username,
        });
        navigation.push("Nav Bar");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      duration: 12000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView>
        <Box safeAreaTop="10" alignItems="center">
          <Center>
            <Image
              source={require("../assets/logo.png")}
              style={theme.smallLogo}
              alt="bookbound logo"
            ></Image>
          </Center>
          <Center w="100%">
            <Box p="1" py="3" w="90%" maxW="290">
              <SafeAreaView>
                <Center>
                  <View style={{ height: 75, width: 100 }}>
                    <LottieView
                      progress={progress}
                      source={require("../assets/Lottie/hello.json")}
                    />
                  </View>
                </Center>
              </SafeAreaView>
              <Text mt="5" color={theme.color.rosey[600]}>
                Create an account to continue!
              </Text>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    value={firstName}
                    placeholder="firstName"
                    onChangeText={(text) => setFirstName(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    value={lastName}
                    placeholder="lastName"
                    onChangeText={(text) => setLastName(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    value={username}
                    placeholder="username"
                    onChangeText={(text) => setUsername(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    value={email}
                    placeholder="email"
                    onChangeText={(text) => setEmail(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    value={password}
                    placeholder="password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Verify Password</FormControl.Label>
                  <Input
                    value={verifyPassword}
                    placeholder="password"
                    onChangeText={(text) => setVerifyPassword(text)}
                    secureTextEntry
                  />
                </FormControl>
                <Center>
                  <HStack>
                    <Button
                      mt="2"
                      size="md"
                      variant="ghost"
                      style={theme.button}
                      colorScheme={theme.color.rosey}
                      onPress={handleSignUp}
                    >
                      <Text color={theme.color.rosey[300]}> Sign Up</Text>
                    </Button>
                    <Button
                      mt="2"
                      size="md"
                      variant="ghost"
                      style={theme.button}
                      colorScheme={theme.color.rosey}
                      onPress={() => navigation.goBack()}
                    >
                      <Text color={theme.color.rosey[300]}>Back to Login</Text>
                    </Button>
                  </HStack>
                </Center>
              </VStack>
            </Box>
          </Center>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default CreateAccount;
