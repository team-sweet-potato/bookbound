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
} from "native-base";
import {
  SafeAreaView,
  View,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LottieView from "lottie-react-native";

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={"flex"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Center w="100%">
            <View>
              <VStack space={7} mt="20">
                <FormControl height="10" width="250">
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
                <Button
                  size="md"
                  variant="ghost"
                  onPress={handleLogin}
                  colorScheme={theme.color.rosey}
                >
                  <Text
                    colorScheme={theme.color.rosey}
                    color={theme.buttonText.color}
                  >
                    Sign in
                  </Text>
                </Button>
                <VStack>
                  <Center>
                    <Text>New user?</Text>
                    <Button
                      size="md"
                      variant="ghost"
                      colorScheme={theme.color.rosey}
                      onPress={handleGoToSignUp}
                    >
                      <Text color={theme.color.rosey[600]}>Sign Up</Text>
                    </Button>
                  </Center>
                </VStack>
              </VStack>
            </View>
          </Center>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default Login;
