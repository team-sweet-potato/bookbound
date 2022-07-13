import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Link,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.push("Nav Bar");
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoToSignUp() {
    navigation.push("Create Account");
  }

  return (
    <KeyboardAwareScrollView>
        <Box safeAreaTop="20" alignItems="center">
          <Image
            source={require("../assets/bookboundtestlogo.png")}
            alt="bookbound logo"
            justifyContent="center"
            alignItems="center"
            width="200"
            height="100"
          ></Image>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Welcome
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Sign in to continue!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
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
                <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
                  Sign in
                </Button>
                <Button mt="2" colorScheme="indigo" onPress={handleGoToSignUp}>
                  Sign Up
                </Button>
              </VStack>
            </Box>
          </Center>
        </Box>
    </KeyboardAwareScrollView>
  );
};

export default Login;
