import React, { useState } from "react";
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
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
  VStack
} from "native-base"

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const takeToHome = () => {
    // navigation.navigate("Nav Bar", { screen: "Home" })
    console.log(auth.currentUser.uid)
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(auth.currentUser.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Box
      safeAreaTop="20"
      alignItems="center">
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
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                value={email}
                placeholder="email"
                onChangeText={text => setEmail(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                placeholder="password"
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
              <Link _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500"
              }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
              Sign in
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={takeToHome}>
              Test: Go to home
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm"
              }} href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center >
    </Box>
  )
}

export default Login
