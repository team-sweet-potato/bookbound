import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
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
  Text,
  VStack,
} from "native-base";

const CreateAccount = () => {
  // Variables to sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSignUp = () => {
    if (password === verifyPassword) {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  };

  return (
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
            Create an account to continue!
          </Heading>
          <VStack space={3} mt="5">
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
            <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
              Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a current user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
              >
                Login
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

export default CreateAccount;
