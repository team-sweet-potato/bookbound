import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Button,
  Center,
  FormControl,
  Image,
  Input,
  VStack,
  NativeBaseProvider,
  Text,
  HStack,
  Box,
  WarningOutlineIcon,
} from "native-base";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { SafeAreaView, View, Animated, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    if (email === "") {
      setEmailError("Please enter a valid email.");
    }
    if (password === "") {
      setPasswordError("Please enter your password.");
    }
    if (emailError || passwordError) {
      return false;
    }
    return true;
  };

  async function handleLogin() {
    try {
      if (validate()) {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.push("Nav Bar");
      }
    } catch (error) {
      let alertTitle = "";
      let alertMessage = "";

      if (error.code === "auth/too-many-requests") {
        alertTitle = "Too many login attempts";
        alertMessage = "Please try again later.";
      } else if (error.code === "auth/wrong-password") {
        alertTitle = "Incorrect username/password";
        alertMessage = "Please try again.";
      } else {
        alertTitle = "Login failed";
        alertMessage = "Please try again later.";
      }

      Alert.alert(alertTitle, alertMessage);
    }
  }

  function handleGoToSignUp() {
    navigation.push("Create Account");
  }

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 12000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <KeyboardAwareScrollView>
        <Center>
          <SafeAreaView>
            <View style={{ height: 200, width: 200 }}>
              <LottieView
                progress={progress}
                source={require("../assets/Lottie/lottieWithCoffee.json")}
              />
            </View>
            <Center>
              <Image
                source={require("../assets/logo.png")}
                style={theme.loginLogo}
                alt="bookbound logo"
              ></Image>
            </Center>
          </SafeAreaView>
        </Center>
        <Center w="100%">
          <View>
            <VStack space={7} mt="20">
              <FormControl width="250" isRequired isInvalid={emailError}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  style={theme.textInput}
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
                  style={theme.textInput}
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
              <View>
                <Button
                  size="sm"
                  colorScheme={theme.rosey[300]}
                  style={theme.button.variants.ghost}
                  onPress={handleLogin}
                  variant="outline"
                  mb="10"
                >
                  <Text fontSize="lg" color={theme.rosey[300]}>
                    Sign in
                  </Text>
                </Button>
              </View>
            </VStack>
          </View>
        </Center>
        <Box bottom=".1" justifyContent={"center"}>
          <Center>
            <Text>New user?</Text>
            <Button
              size="lg"
              variant="ghost"
              colorScheme={theme.rosey}
              style={theme.button.variants.ghost}
              onPress={handleGoToSignUp}
            >
              <Text color={theme.rosey[300]}>Sign Up</Text>
            </Button>
          </Center>
        </Box>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
};

export default Login;
