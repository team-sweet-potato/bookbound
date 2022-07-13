import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Link,
  Image,
  Input,
  Text,
  VStack,
  NativeBaseProvider,
} from "native-base";
import { SafeAreaView, View, Animated } from "react-native";
import LottieView from "lottie-react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const theme = useTheme();

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

  function takeToHome() {
    navigation.push("Nav Bar");
  }

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
    <NativeBaseProvider theme={theme}>
      <Center>
        <SafeAreaView>
          <View style={{ height: 200, width: 200 }}>
            <LottieView
              progress={progress}
              source={require("../lottieWithCoffee.json")}
            />
          </View>

          <Center>
            <Image
              source={require("../assets/redBookboundLogo.png")}
              style={theme.loginLogo}
              alt="bookbound logo"
            ></Image>
          </Center>
        </SafeAreaView>
      </Center>
      <Box>
      <Center w="100%">
        <View>
          <VStack space={7} mt="20">
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
              {/* Not functioning Link for Forgot Password */}
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
              Sign in
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={handleGoToSignUp}>
              Sign Up
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={takeToHome}>
                Take to Home
              </Button>
            <HStack mt="3" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              {/* Link not functional, switch out for button? */}
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </View>

      </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default Login;
