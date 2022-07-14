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
  WarningOutlineIcon
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';

const CreateAccount = ({ navigation }) => {
  // Variables to sign up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstNameError, setFirstNameError] =useState("");
  const [lastNameError, setLastNameError] =useState("");
  const [usernameError, setUsernameError] =useState("");
  const [emailError, setEmailError] =useState("");
  const [passwordError, setPasswordError] =useState("");

  const validate = () => {
    if (email === "") {
      setEmailError("Please enter a valid email.");
    }
    if (password === "" || verifyPassword === "") {
      setPasswordError("Please enter a password.");
    } else if (password !== verifyPassword) {
      setPasswordError("Passwords do not match.");
    }
    if (firstName === "") {
      setFirstNameError("Please enter your first name.");
    }
    if (lastName === "") {
      setLastNameError("Please enter your last name.");
    }
    if (username === "") {
      setUsernameError("Please enter a valid username.");
    }
    if (firstNameError || lastNameError || usernameError || emailError || passwordError) {
      return false;
    } else {
      return true;
    }
  };

  async function handleSignUp() {
    if (validate()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: firstName,
          lastName: lastName,
          username: username,
        });
        navigation.push("Nav Bar");
        } catch (error) {
          Alert.alert("Sign up failed", "Please try again.");
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
              <FormControl isRequired isInvalid={firstNameError}>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  value={firstName}
                  placeholder="firstName"
                  onChangeText={(text) => {
                    setFirstName(text)
                    setFirstNameError("")
                  }}
                />
                {firstNameError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{firstNameError}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={lastNameError}>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  value={lastName}
                  placeholder="lastName"
                  onChangeText={(text) => {
                    setLastName(text)
                    setLastNameError("")
                  }}
                />
                {lastNameError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{lastNameError}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={usernameError}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  value={username}
                  placeholder="username"
                  onChangeText={(text) => {
                    setUsername(text)
                    setUsernameError("")
                  }}
                />
                {usernameError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{usernameError}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={emailError}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  placeholder="email"
                  onChangeText={(text) => {
                    setEmail(text)
                    setEmailError("")
                  }}
                />
                {emailError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{emailError}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={passwordError}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={password}
                  placeholder="password"
                  onChangeText={(text) => {
                    setPassword(text)
                    setPasswordError("")
                  }}
                  secureTextEntry
                />
                {passwordError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{passwordError}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={passwordError}>
                <FormControl.Label>Verify Password</FormControl.Label>
                <Input
                  value={verifyPassword}
                  placeholder="password"
                  onChangeText={(text) => {
                    setVerifyPassword(text)
                    setPasswordError("")
                  }}
                  secureTextEntry
                />
                {passwordError && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{passwordError}</FormControl.ErrorMessage>}
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
