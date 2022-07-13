import React, { useState } from "react";
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
  Link,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateAccount = ({ navigation }) => {
  // Variables to sign up
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
              Create an account to continue!
            </Heading>
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
              <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
                Sign up
              </Button>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => navigation.goBack()}
              >
                Back to Login
              </Button>
            </VStack>
          </Box>
        </Center>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default CreateAccount;
