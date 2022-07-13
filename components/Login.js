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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { SafeAreaView, View, Animated } from "react-native";
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
                colorScheme={theme.rosey[300]}
                style={theme.button.variants.ghost}
                onPress={handleLogin}
              >
                <Text fontSize="lg" color={theme.rosey[300]}>
                  Sign in
                </Text>
              </Button>
              <VStack>
                <Center>
                  <Text>New user?</Text>
                  <Button
                    size="lg"
                    variant="ghost"
                    colorScheme={theme.rosey[300]}
                    style={theme.button.variants.ghost}
                    onPress={handleGoToSignUp}
                  >
                    <Text color={theme.rosey[300]}>Sign Up</Text>
                  </Button>
                </Center>
              </VStack>
            </VStack>
          </View>
        </Center>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  );
};

export default Login;
