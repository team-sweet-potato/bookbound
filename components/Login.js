import React, { useState } from "react";
import { auth } from '../firebase'
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
  VStack
} from "native-base"
import axios from 'axios'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function takeToHome() {
    navigation.push("Nav Bar")
  }

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigation.push("Nav Bar")
    } catch (error) {
      console.log(error)
    }
  }

  function handleGoToSignUp() {
    navigation.push("Create Account")
  }

  async function handleSignOut() {
    await signOut(auth)
  }

  async function handleGetTestData() {
    const { data } = await axios.get(`http://localhost:8000/Disappearing Acts/1`);
    console.log(data["isbn"])
  }

  return (
    <ScrollView>
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
                {/* Not functioning Link for Forgot Password */}
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
                Take to Home
              </Button>
              <Button mt="2" colorScheme="indigo" onPress={handleGoToSignUp}>
                Sign Up
              </Button>
              <Button mt="2" colorScheme="indigo" onPress={handleSignOut}>
                Log Out
              </Button>
              {/* Test button to be removed on final product */}
              <Button mt="2" colorScheme="indigo" onPress={handleGetTestData}>
                Get Test Data
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  I'm a new user.{" "}
                </Text>
                {/* Link not functional, switch out for button? */}
                <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm"
                }} >
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center >
      </Box>
    </ScrollView>
  )
}

export default Login
