import React, { useState } from "react";
import theme from "./Theme.js";
import { auth } from "../firebase";
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
  VStack,
  NativeBaseProvider,
} from "native-base";
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
      <Center>
        <SafeAreaView>
          <View style={{ height: 200, width: 200 }}>
            <LottieView
              progress={progress}
              source={require("../assets/lottieWithCoffee.json")}
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
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
                Sign in
              </Button>
              <Button mt="2" colorScheme="indigo" onPress={handleGoToSignUp}>
                Sign Up
              </Button>
            </VStack>
          </View>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default Login;
