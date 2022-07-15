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
  WarningOutlineIcon,
  NativeBaseProvider,
  Footer,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";
import { Animated, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";

const CreateAccount = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      passwordError
    ) {
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
              <Text mt="5" color={theme.rosey[600]}>
                Create an account to continue!
              </Text>

              <VStack space={3} mt="5">
                <FormControl isRequired isInvalid={firstNameError}>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    value={firstName}
                    placeholder="firstName"
                    onChangeText={(text) => {
                      setFirstName(text);
                      setFirstNameError("");
                    }}
                  />
                  {firstNameError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {firstNameError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={lastNameError}>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    value={lastName}
                    placeholder="lastName"
                    onChangeText={(text) => {
                      setLastName(text);
                      setLastNameError("");
                    }}
                  />
                  {lastNameError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {lastNameError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={usernameError}>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    value={username}
                    placeholder="username"
                    onChangeText={(text) => {
                      setUsername(text);
                      setUsernameError("");
                    }}
                  />
                  {usernameError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {usernameError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={emailError}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    value={email}
                    placeholder="email"
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailError("");
                    }}
                  />
                  {emailError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {emailError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={passwordError}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    value={password}
                    placeholder="password"
                    onChangeText={(text) => {
                      setPassword(text);
                      setPasswordError("");
                    }}
                    secureTextEntry
                  />
                  {passwordError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {passwordError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={passwordError}>
                  <FormControl.Label>Verify Password</FormControl.Label>
                  <Input
                    value={verifyPassword}
                    placeholder="password"
                    onChangeText={(text) => {
                      setVerifyPassword(text);
                      setPasswordError("");
                    }}
                    secureTextEntry
                  />
                  {passwordError && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {passwordError}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Center>
                  <HStack>
                    <Button
                      mt="2"
                      size="md"
                      variant="ghost"
                      style={theme.button}
                      colorScheme={theme.rosey}
                      onPress={handleSignUp}
                    >
                      <Text color={theme.rosey[300]}> Sign Up</Text>
                    </Button>
                    <Button
                      mt="2"
                      size="md"
                      variant="ghost"
                      style={theme.button}
                      colorScheme={theme.rosey}
                      onPress={() => navigation.goBack()}
                    >
                      <Text color={theme.rosey[300]}>Back to Login</Text>
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
